import { Permission, Role } from "../models";

export const permissionController = {
  all: (req, res) => {
    Permission.find({}, function (err, permissions) {
      var permissionMap = {};

      permissions.forEach(function (permission) {
        permissionMap[permission._id] = permission;
      });

      res.send(permissionMap);
    });
  },
  getMyPermission: (req, res) => {
    console.log(req.user.role)
    Role.findOne({ name: req.user.role }, function (err, role) {
      res.send(role.permissions);
    });
  },
};
