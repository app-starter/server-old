const permissions = {
  Permission_RoleWrite: "Permission_RoleWrite",
  Permission_RoleDelete: "Permission_RoleDelete",
  Permission_RoleRead: "Permission_RoleRead",
  Permission_UserRead: "Permission_UserRead",
};

export const DefaultData = {
  permissions: permissions,
  roles: [
    {
      name: "Admin",
      permissions: [
        permissions.Permission_RoleWrite,
        permissions.Permission_RoleDelete,
        permissions.Permission_RoleRead,
        permissions.Permission_UserRead,
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
