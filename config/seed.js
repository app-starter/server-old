import { Permission, Role, User } from "../models";
import { DefaultData } from "../models/DefaultData";

export default function seedData() {
  createPermission(DefaultData.permissions.Permission_UserRead);
  createPermission(DefaultData.permissions.Permission_RoleWrite);
  createPermission(DefaultData.permissions.Permission_RoleRead);
  createPermission(DefaultData.permissions.Permission_RoleDelete);

  DefaultData.roles.map((item) => {
    createRole(item);
  });
  DefaultData.users.map((item) => {
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
