const BrandController = require("../controller/brandController")
const router = require("express").Router()
const userRole = require("../utils/userRoles");
const allowdTo = require("../middleware/allowedTo");
const verifyToken = require("../middleware/VerifyToken");
const BrandValidator = require("../Validator/brandValidator")
router.post("/brands",verifyToken,allowdTo(userRole.ADMIN),BrandValidator.createBrandValidator,BrandController.createBrand)
router.get("/brands",BrandController.getAllBrands)
router.get("/brands/:BrandId",BrandValidator.getBrandValidator,BrandController.getSingleBrand)
router.put("/brands/:BrandId",verifyToken,allowdTo(userRole.ADMIN),BrandValidator.updateBrandValidator,BrandController.updateBrand)
router.delete("/brands/:BrandId",verifyToken,allowdTo(userRole.ADMIN),BrandValidator.deleteBrandValidator,BrandController.deleteBrand)



module.exports = router