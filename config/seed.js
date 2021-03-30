import { Permission, Role, User } from "../models";
import {permissions} from "../models/default-permissions";
const defaultData = {
  permissions: permissions,
  roles: [
    {
      name: "Admin",
      permissions: [
        permissions.RoleWrite,
        permissions.RoleDelete,
        permissions.RoleRead,
        permissions.UserRead,
      ],
    },
    { name: "Member" },
  ],
  users: [
    {
      email: "admin@admin.com",
      password: "123qwe",
      role: "Admin",
    },
  ],
};

export default function seedData() {
  createPermission(permissions.UserRead);
  createPermission(permissions.RoleWrite);
  createPermission(permissions.RoleRead);
  createPermission(permissions.RoleDelete);

  defaultData.roles.map((item) => {
    createRole(item);
  });
  defaultData.users.map((item) => {
    createUser(item);
  });
}

function createPermission(permissionName) {
  Permission.findOne({ name: permissionName }, (err, existingPermission) => {
    const permission = new Permission({
      name: permissionName,
      _id: permissionName,
    });
    if (err) {
      return next(err);
    }
    if (existingPermission) {
      return existingPermission;
    }
    permission.save((item) => {
      return item;
    });
  });
}
function createRole(roleItem) {
  Role.findOne({ name: roleItem.name }, (err, existingRole) => {
    const role = new Role({
      _id: roleItem.name,
      name: roleItem.name,
      permissions: roleItem.permissions,
    });
    if (err) {
      return console.log(err);
    }
    if (existingRole) {
      return existingRole;
    }
    role.save((item) => {
      return item;
    });
  });
}
function createUser(userItem) {
  const user = new User({
    email: userItem.email,
    password: userItem.password,
    role: userItem.role,
  });

  User.findOne({ email: userItem.email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      console.log({ msg: "Account with that email address already exists." });
      return;
    }
    user.save((err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}
