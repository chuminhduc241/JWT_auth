const authController = require("../controllers/authController");
const middlewareController = require("../controllers/midddleware/middlewareController");

const router = require("express").Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/refreshtoken", authController.refeshToken);
router.post("/logout", middlewareController.veritytoken, authController.logout);

module.exports = router;
