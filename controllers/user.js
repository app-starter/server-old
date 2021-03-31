import { User } from "../models";

export const userController = {
  getAllUser: (req, res) => {
    User.find({}, (err, users) => {
      res.send(users);
    }).populate("Role");
  },
};
