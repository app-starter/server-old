import { User } from "../models";

export const userController = {
  getAllUser: (req, res) => {
    User.find({}, (err, users) => {
      var userMap = {};

      users.forEach(function (user) {
        userMap[user._id] = user;
      });
      res.send(userMap);
    }).populate("Role");
  },
};
