const { body } = require("express-validator");
const productController = require("../controller/productController");
const router = require("express").Router();
const userRole = require("../utils/userRoles");
const allowdTo = require("../middleware/allowedTo");
const verifyToken = require("../middleware/VerifyToken");

// for user
router.get("/products", productController.get_all_products);
router.get("/products/:id", productController.get_single_product);
router.post(
  "/products/:id/reviews",
  verifyToken,
  productController.CreateProductReview
);

// for admin
router.post(
  "/products",
  verifyToken,
  allowdTo(userRole.ADMIN),
  productController.createProduct
);
router.put(
  "/products/:id",
  verifyToken,
  allowdTo(userRole.ADMIN),
  productController.updateProduct
);
router.delete(
  "/products/:id",
  verifyToken,
  allowdTo(userRole.ADMIN),
  productController.deleteProduct
);
router.get("/products/seller/all", productController.get_all_seller_products);
router.delete(
  "/products/seller/:id",
  verifyToken,
  allowdTo(userRole.ADMIN),
  productController.reject_seller_product
);

// for seller
router.get(
  "/products/seller/:id",
  productController.get_seller_accepted_products
);
router.get(
  "/products/seller/pending/:id",
  productController.get_seller_pending_products
);
router.post(
  "/products/seller",
  verifyToken,
  allowdTo(userRole.SELLER),
  productController.createSellerProduct
);
// router.put(
//   "/products/seller/:id",
//   verifyToken,
//   allowdTo(userRole.SELLER),
//   productController.updateSellerProduct
// );

module.exports = router;
