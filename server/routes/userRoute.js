const userController = require("../controller/userController");
const { body } = require("express-validator");
const router = require("express").Router();
const verifyToken = require("../middleware/VerifyToken");
// const userRoles = require('../utils/userRoles');
// const allowedTo = require('../middleware/allowedTo');

router.get("/users", verifyToken, userController.getUsers);
router.post(
  "/users/register",
  [
    body("name").notEmpty().withMessage("please fill the input name"),
    body("email").notEmpty().withMessage("please fill the input email"),
    body("password").notEmpty().withMessage("please fill the input password"),
  ],
  userController.register
);

router.post(
  "/users/login",
  [
    body("email").notEmpty().withMessage("please fill the input email"),
    body("password").notEmpty().withMessage("please fill the input password"),
  ],
  userController.login
);

router.post("/users/logout", userController.logoutUser);
router.get("/users/:id", userController.getUserByID);
router.post("/users/register", userController.register);
router.post("/users/profile", userController.getUserPorfile);
router.put("/users/profile", userController.updateUserPorfile);
router.put("/users/:id", userController.UpdateUser);
router.delete("/users/:id", userController.deleteUser);
module.exports = router;
