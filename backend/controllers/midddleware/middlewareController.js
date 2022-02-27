const jwt = require("jsonwebtoken");

const middlewareController = {
  veritytoken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accesstoken = token.split(" ")[1];
      jwt.verify(accesstoken, process.env.ACCESSTOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(404).json("token is valid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("you're not authenticated");
    }
  },
  verityTokenAndAdminAuth: (req, res, next) => {
    console.log(req.user);
    if (req.user.id === req.params.id || req.user.admin) {
      next();
    } else return res.status(403).json("you're not allowed to delete other");
  },
};

module.exports = middlewareController;
