const Users = require("../models/User");

const UserController = {
  getAllUser: async (req, res) => {
    try {
      const user = await Users.find();
      return res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      return res.status(200).json("deleted susscessfully");
    } catch (err) {
      return res.staus(500).json(err.message);
    }
  },
};

module.exports = UserController;
