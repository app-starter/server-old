import { Role } from "../models";

export const roleController = {
  addRole: async (req, res, next) => {
    const role = new Role({
      _id: req.body.name,
      name: req.body.name,
      permissions: req.body.permissions,
    });
    Role.findOne({ name: req.body.name }, (err, existingRole) => {
      if (err) {
        return next(err);
      }
      if (existingRole) {
        res.send({ msg: "Role Name already exists." });
        return;
      }
      role.save((err) => {
        if (err) {
          return next(err);
        }
        res.json({ success: true, message: "Role Başarıyla Eklendi" });
      });
    });
  },
  updateRole: async (req, res, next) => {
    const role = new Role({
      _id: req.body.id,
      name: req.body.name,
      permissions: req.body.permissions,
    });
    Role.findOne({ _id: req.body.id }, (err, existingRole) => {
      if (err) {
        return next(err);
      }
      if (existingRole) {
        existingRole.name = role.name;
        existingRole.permissions = role.permissions;
        existingRole.save((err) => {
          if (err) {
            return next(err);
          }
          res.json({ success: true, message: "Role Başarıyla Eklendi" });
        });
      } else {
        res.send({ msg: "Role Name already exists." });
        return;
      }
    });
  },
  all: (req, res) => {
    Role.find({}, function (err, roles) {
     
      res.send(roles);
    });
  },
};
