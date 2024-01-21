const User = require("../models/user.model");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Comprobar si el correo electrónico es válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).send({
                message: "Failed! Invalid email format."
            });
        }

        // Comprobar duplicados en username o email
        const existingUser = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });

        if (existingUser) {
            return res.status(400).send({
                message: "Failed! Username or email already in use."
            });
        }

        next();
    } catch (error) {
        return res.status(500).send({
            message: `Error checking duplicate username or email: ${error.message}`
        });
    }
};


const checkRolesExisted = (req, res, next) => {
  if (req.body.rol) {
    const rolesPermitidos = ["user", "admin", "moderator"];
      if (!rolesPermitidos.includes(req.body.rol)) {
        res.status(400).send({
          message: "Failed Roles does not Exist = " + req.body.roles[i],
        });
        return;
      }
    
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
