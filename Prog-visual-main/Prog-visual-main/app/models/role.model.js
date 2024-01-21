// models/role.model.js
const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: String,
});

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
