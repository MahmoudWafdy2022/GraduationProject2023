const {body} = require("express-validator")
const productController = require("../controller/productController")
const router = require("express").Router()
const userRole = require("../utils/userRoles")
const allowdTo = require("../middleware/allowedTo")
const verifyToken = require("../middleware/VerifyToken")

router.get("/products",productController.get_all_products)
router.get("/products/:id",productController.get_single_product)
router.post("/products",verifyToken,allowdTo(userRole.ADMIN),productController.createProduct)
router.put("/products/:id",verifyToken,allowdTo(userRole.ADMIN),productController.updateProduct)
router.delete("/products/:id",verifyToken,allowdTo(userRole.ADMIN),productController.deleteProduct)
router.post("/products/:id/reviews",verifyToken,productController.CreateProductReview)



module.exports = router