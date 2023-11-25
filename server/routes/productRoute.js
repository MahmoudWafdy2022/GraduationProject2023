const {body} = require("express-validator")
const productController = require("../controller/productController")
const router = require("express").Router()
const userRole = require("../utils/userRoles")
const allowdTo = require("../middleware/allowedTo")
const verifyToken = require("../middleware/VerifyToken")

router.get("/products",productController.get_all_products)
router.get("/products/:productId",productController.get_single_product)
router.post("/products",verifyToken,allowdTo(userRole.ADMIN),productController.createProduct)



module.exports = router