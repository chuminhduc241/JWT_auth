const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshtokens = [];
const generateAccessToken = (data) => {
  const accesstoken = jwt.sign(
    { id: data._id, admin: data.admin },
    process.env.ACCESSTOKEN_SECRET,
    {
      expiresIn: "30s",
    }
  );
  return accesstoken;
};
const generateRefreshToken = (data) => {
  const accesstoken = jwt.sign(
    { id: data._id, admin: data.admin },
    process.env.REFRESHTOKEN_SECRET,
    {
      expiresIn: "12h",
    }
  );
  return accesstoken;
};
const authController = {
  registerUser: async (req, res) => {
    console.log(req.body.username);
    try {
      const { username, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email  already exists" });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters" });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        username,
        email,
        password: passwordHash,
      });
      await newUser.save();

      res.status(200).json(newUser);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "user does not exist" });
      const isMath = await bcrypt.compare(password, user.password);
      if (!isMath) return res.status(400).json({ msg: "Incorrect password" });
      const accesstoken = generateAccessToken(user);
      const refreshtoken = generateRefreshToken(user);
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      refreshtokens.push(refreshtoken);
      res.status(200).json({ user, accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refeshToken: async (req, res) => {
    const refreshtoken = req.cookies.refreshtoken;
    console.log(refreshtoken);
    if (!refreshtoken) return res.status(401).json("you're not authenticated");
    if (!refreshtokens.includes(refreshtoken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshtoken, process.env.REFRESHTOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshtokens = refreshtokens.filter((token) => token != refreshtoken);
      const newAccesstoken = generateAccessToken(user);
      const newRefreshtoken = generateRefreshToken(user);
      res.cookie("refreshtoken", newRefreshtoken, {
        httpOnlycookie: true,
        path: "/",
        sameSite: "strict",
      });
      refreshtokens.push(newRefreshtoken);
      res.status(200).json({ accesstoken: newAccesstoken });
    });
  },
  logout: async (req, res) => {
    res.clearCookie("refreshtoken");
    refreshtokens = refreshtokens.filter(
      (token) => token != req.cookies.refreshtoken
    );
  },
};
module.exports = authController;
