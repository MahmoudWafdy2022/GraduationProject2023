const orderController = require("../controller/orderController");
const router = require("express").Router();
const userRole = require("../utils/userRoles");
const allowdTo = require("../middleware/allowedTo");
const verifyToken = require("../middleware/VerifyToken");

router.get(
  "/orders",
  verifyToken,
  allowdTo(userRole.ADMIN),
  orderController.getOrders
);
router.get("/orders/myorders", verifyToken, orderController.getMyOrders);
router.post("/orders", verifyToken, orderController.addOrderItems);
router.get("/orders/:id", verifyToken, orderController.getOrderById);
router.put("/orders/:id/pay", verifyToken, orderController.updateOrderToPaid);
router.get(
  "/orders/:id/deliver",
  verifyToken,
  allowdTo(userRole.ADMIN),
  orderController.updateOrderToDeliverd
);

module.exports = router;