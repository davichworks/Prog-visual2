const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const config = require("../config/auth.config");

exports.signup = async (req, res) => {
  try {
    const isModerator = req.body.rol === 'moderator';
    const isAdmin = req.body.rol === 'admin';

    // Verificar la contraseña solo si es moderador o administrador
    if ((isModerator || isAdmin) && req.body.password !== 'patata') {
      return res.status(400).send({ message: 'Password Incorrecta para la creación administrador/moderador.' });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      rol: req.body.rol,
    });
    
    if (req.body.rol) {
      const roleName = req.body.rol;
      const role = await Role.findOne({ name: roleName });
    
      if (role) {
        user.roles = [role._id];
        await user.save();
      } else {
        // Manejar el caso donde el rol no existe en la base de datos
        res.status(400).send({ message: 'Failed! Role does not exist.' });
        return;
      }
    } else {
      // Default role: 'user'
      const defaultRole = await Role.findOne({ name: 'user' });
      user.roles = [defaultRole._id];
      await user.save();
    }

    res.send({ message: 'User was registered successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};



exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
   
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
   
   
    const idString = user._id.toString();
    
    const token = jwt.sign({ id: idString }, config.secret, {
      algorithm: 'HS256',
      expiresIn: 86400, // 24 hours
    });
    

    const role = await Role.findOne({ name: user.rol });

    if (!role) {
      return res.status(500).send({ message: 'Error retrieving user role.' });
    }
    
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      rol: user.rol,
      accessToken: token,
    });
    
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
