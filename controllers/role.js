const Role = require('../models/Role');

var RoleController = {
    addRole: async (req, res) => {
        const role = new Role({
            name: req.body.name,
        });
        Role.findOne({ name: req.body.name }, (err, existingRole) => {
            if (err) { return next(err); }
            if (existingRole) {
                res.send({ msg: 'Role Name already exists.' });
                return;
            }
            role.save((err) => {
                if (err) { return next(err); }
                res.json({ success: true, message: "Role Başarıyla Eklendi" })
            });
        });
    },
    all: (req, res) => {
       
        Role.find({}, function(err, roles) {
            var roleMap = {};
        
            roles.forEach(function(role) {
                roleMap[role._id] = role;
            });
        
            res.send(roleMap);  
          });
      
    }


}
module.exports = RoleController;