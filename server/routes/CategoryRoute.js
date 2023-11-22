const CategoryController = require("../controller/categoryController")
const router = require("express").Router()
const CategoryValidator = require("../Validator/categoryValidator")
router.post("/categories",CategoryValidator.createCategoryValidator,CategoryController.createCategory)
router.get("/categories",CategoryController.getAllCategories)
router.get("/categories/:categoryId",CategoryValidator.getCategoryValidator,CategoryController.getSingleCategory)
router.put("/categories/:categoryId",CategoryValidator.updateCategoryValidator,CategoryController.updateCategory)
router.delete("/categories/:categoryId",CategoryValidator.deleteCategoryValidator,CategoryController.deleteCategory)



module.exports = router