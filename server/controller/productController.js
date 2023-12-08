const httpStatusText = require("../utils/httpStatusText");
const { validationResult } = require("express-validator");
const productModel = require("../models/productModel");

const get_single_product = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (product) {
      return res.json({ status: httpStatusText.SUCCESS, data: { product } });
    }
    return res.status(404).json({
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
// not check
const createProduct = async (req, res) => {
  try {
    const product = new productModel({
      name: "Sample name",
      price: 0,
      user: req.currentUser.id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });
    console.log(product);
    const createdProduct = await product.save();
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { createdProduct } });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//not check
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const product = await productModel.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      return res
        .status(200)
        .json({ status: httpStatusText.SUCCESS, data: { updatedProduct } });
    } else {
      return res.status(404).json({
        statur: httpStatusText.FAIL,
        data: null,
        msg: "Product not found",
      });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
// not check
const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (product) {
      await productModel.deleteOne({ _id: product._id });
      res.status(200).json({ message: "Product removed" });
    } else {
      res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "Product not found",
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const CreateProductReview = async(req,res)=>{
  try{
const {rating,comment} = req.body
const product = await productModel.findById(req.params.id);

if (product) {
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({ message: 'Review added' });
} else {
  res.status(404);
  throw new Error('Product not found');
}

}catch(err){
  return res.status(400).json({ status: httpStatusText.ERROR, message: err.message });

}
}

module.exports = {
  get_single_product,
  get_all_products,
  createProduct,
  updateProduct,
  deleteProduct,
  CreateProductReview
};
