import express from "express";
import passport from "passport";
import permit from "../middleware/authorization";

import {
  userController,
  permissionController,
  roleController,
  authController,
} from "../controllers";
import { permissions } from "../models/default-permissions";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignup);

router.get(
  "/getAllUser",
  passport.authenticate("jwt", { session: false }),
  permit(permissions.UserRead),
  userController.getAllUser
);

router.post(
  "/addRole",
  passport.authenticate("jwt", { session: false }),
  permit(permissions.RoleWrite),
  roleController.addRole
);
router.post(
  "/updateRole",
  passport.authenticate("jwt", { session: false }),
  permit(permissions.RoleWrite),
  roleController.updateRole
);
router.get(
  "/getAllRole",
  passport.authenticate("jwt", { session: false }),
  permit(permissions.RoleRead),
  roleController.all
);

router.get("/getAllPermission", permissionController.all);

export default router;
