const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roleSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
