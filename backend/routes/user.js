const middlewareController = require("../controllers/midddleware/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();

router.get("/", middlewareController.veritytoken, userController.getAllUser);
router.delete(
  "/:id",
  middlewareController.veritytoken,
  middlewareController.verityTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = router;
