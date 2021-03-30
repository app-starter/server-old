import Permission from "../models/Permission";

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
};
