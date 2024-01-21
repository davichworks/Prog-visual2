const mongoose = require("mongoose");
const dbConfig = require("../config/db.config.js");
const User = require("../models/user.model");
    const Role = require("../models/role.model");
    const Libro = require("../models/libros.model");
    
(async () => {
  try {
    await mongoose.connect(dbConfig.url, dbConfig.options);
    console.log("Connected to the database!");

    

    // Crear colección de usuarios si no existe
    await mongoose.connection.createCollection(User.collection.name);
    console.log(`Collection '${User.collection.name}' created.`);

    await mongoose.connection.createCollection(Libro.collection.name);
    console.log(`Collection '${Libro.collection.name}' created.`);
    // Crear colección de roles si no existe
    await mongoose.connection.createCollection(Role.collection.name);
    console.log(`Collection '${Role.collection.name}' created.`);

    // Crear roles por defecto solo si no existen
    const existingRoles = await Role.find();
    const existingBooks = await Libro.find();

    if (existingRoles.length === 0) {
      const rolesData = [
        { name: 'user' },
        { name: 'admin' },
        { name: 'moderator' },
      ];

      // Insertar roles solo si no existen
      await Role.insertMany(rolesData);
      console.log("Default roles inserted.");
    } else {
      console.log("Roles already exist.");
    }

    if(existingBooks.length ===0){
      const booksData = [
        { titulo: '1984', autor: 'George Orwell' },
        { titulo: 'To Kill a Mockingbird', autor: 'Harper Lee' },
        { titulo: 'The Great Gatsby', autor: 'F. Scott Fitzgerald' },
        { titulo: 'One Hundred Years of Solitude', autor: 'Gabriel García Márquez' },
        { titulo: 'Pride and Prejudice', autor: 'Jane Austen' },
        { titulo: 'The Catcher in the Rye', autor: 'J.D. Salinger' },
        { titulo: 'The Lord of the Rings', autor: 'J.R.R. Tolkien' },
        { titulo: 'Harry Potter and the Sorcerer\'s Stone', autor: 'J.K. Rowling' },
        { titulo: 'The Hobbit', autor: 'J.R.R. Tolkien' },
        { titulo: 'The Chronicles of Narnia', autor: 'C.S. Lewis' },
      ];
      

      await Libro.insertMany(booksData);
      console.log("Default Books inserted")
    }else{
      console.log("Books already exist")
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    
  }
})();
