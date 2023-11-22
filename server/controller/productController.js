const httpStatusText = require("../utils/httpStatusText");
const { validationResult } = require("express-validator");
const productModel = require("../models/productModel");

const get_single_product = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.productId);
    if (product) {
      return res.json({ status: httpStatusText.SUCCESS, data: { product } });
    }
    return res
      .status(404)
      .json({
        status: httpStatusText.FAIL,
        data: null,
        message: "product not found",
      });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const get_all_products = async (req, res) => {
  try {
    const products = await productModel.find();
    res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { products } });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const product = new productModel({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await createProduct.save();
  res.status(201).json({status:httpStatusText.SUCCESS,data:{createdProduct}});
};


module.exports = { get_single_product, get_all_products ,createProduct};
