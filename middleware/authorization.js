import { Role } from "../models";

// middleware for doing role-based permissions

export default function permit(...permittedRoles) {
  // return a middleware
  return (request, response, next) => {
    const { user } = request;

    Role.findById(user.role, function (err, res) {
      if (user && res.permissions.includes(...permittedRoles)) {
        next(); // role is allowed, so continue on the next middleware
      } else {
        response.status(403).json({ message: "Forbidden" }); // user is forbidden
      }
    });
  };
}
