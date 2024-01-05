const httpStatusText = require("../utils/httpStatusText");
const { validationResult } = require("express-validator");
const productModel = require("../models/productModel");
const sellerProductModel = require("../models/sellerProductModel");
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
const get_all_products_no_pagination = async (req, res) => {
  try {
    // Retrieve all products without any filtering or pagination
    const products = await productModel.find();

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { products },
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const get_all_products = async (req, res) => {
  try {
    const allProducts = await productModel.find();

    //filter
    const queryStringObject = { ...req.query };
    const excludeFields = ["pageNumber", "limit", "sort", "fields"];
    excludeFields.forEach((field) => delete queryStringObject[field]);

    // apply filteration using [gte,gt,lte,lt]
    let queryStr = JSON.stringify(queryStringObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //

    //pagination
    const limit = parseInt(req.query.limit) || 6;
    const page = parseInt(req.query.pageNumber) || 1;
    const skip = (page - 1) * limit;
    //

    //
    //build query
    mongooseQuery = await productModel
      .find(JSON.parse(queryStr))
      .skip(skip)
      .limit(limit);

    //

    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      mongooseQuery = await productModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort(sortBy);
    } else {
      mongooseQuery = await productModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort("-createdAt");
    }

    //

    //search
    // const keyword = req.query.keyword
    //   ? { name: { $regex: req.query.keyword, $options: "i" } }
    //   : {};
    // if(keyword){
    //   mongooseQuery = await productModel.find(keyword).skip(skip).limit(limit);

    // }
    if (req.query.keyword) {
      const query = {};
      query.$or = [{ name: { $regex: req.query.keyword, $options: "i" } }];

      mongooseQuery = await productModel.find(query).skip(skip).limit(limit);
    }

    const count = await productModel.countDocuments(req.query.keyword);

    //

    console.log(req.query);
    //execute query
    const products = await mongooseQuery;
    //

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      page,
      pages: Math.ceil(allProducts.length / limit),
      numOfProducts: products.length,
      data: { products },
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createProduct = async (req, res) => {
  const {
    name,
    price,
    user,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;
  try {
    const product = new productModel({
      name: name || "Sample name",
      price: price || 0,
      user: user || req.currentUser.id,
      image: image || "/images/sample.jpg",
      brand: brand || "Sample brand",
      category: category || "Sample category",
      countInStock: countInStock || 0,
      numReviews: 0,
      description: description || "Sample description",
    });

    const createdProduct = await product.save();
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { createdProduct } });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
      specifications,
      longDescription,
    } = req.body;
    const product = await productModel.findById(req.params.id);
    console.log(image);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.specifications = specifications;
      product.longDescription = longDescription;

      const updatedProduct = await product.save();

      return res
        .status(200)
        .json({ status: httpStatusText.SUCCESS, data: { updatedProduct } });
    } else {
      return res.status(404).json({
        status: httpStatusText.FAIL,
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

const CreateProductReview = async (req, res) => {
  try {
    const { rating, comment, userInfo } = req.body;

    const product = await productModel.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === userInfo.id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
      const name = userInfo?.firstname + " " + userInfo?.lastname;
      const roundedRating = Number(rating).toFixed(2);
      const review = {
        name,
        rating: Number(roundedRating),
        comment,
        user: userInfo.id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      const savedProduct = await product.save();

      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const createSellerProduct = async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    countInStock,
    price,
    image,
    specifications,
    longDescription,
  } = req.body;

  try {
    const product = new sellerProductModel({
      name,
      price,
      user: req.currentUser.id,
      image: image || "/images/sample.jpg",
      brand,
      category,
      countInStock,
      numReviews: 0,
      description,
      specifications,
      longDescription,
    });

    const createdProduct = await product.save();

    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { createdProduct } });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const get_seller_accepted_products = async (req, res) => {
  const id = req.params.id;
  // Find all products where the user field matches the provided userId
  try {
    const products = await productModel.find({ user: id });
    res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { products } });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const get_seller_single_product_details = async (req, res) => {
  try {
    const product = await sellerProductModel.findById(req.params.id);

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

const get_seller_pending_products = async (req, res) => {
  const id = req.params.id;
  // Find all products where the user field matches the provided userId
  try {
    const products = await sellerProductModel.find({ user: id });
    res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { products } });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: err.message });
  }
};
const get_all_seller_products = async (req, res) => {
  try {
    const products = await sellerProductModel.find();
    console.log(products);
    res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { products } });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const reject_seller_product = async (req, res) => {
  try {
    const product = await sellerProductModel.findById(req.params.id);

    if (product) {
      await sellerProductModel.deleteOne({ _id: product._id });
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

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ rating: -1 }).limit(3);

    res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { products } });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: err.message });
  }
};

module.exports = {
  get_single_product,
  get_all_products,
  createProduct,
  updateProduct,
  deleteProduct,
  CreateProductReview,
  createSellerProduct,
  get_seller_accepted_products,
  get_seller_pending_products,
  get_all_seller_products,
  reject_seller_product,
  getTopProducts,
  get_all_products_no_pagination,
  get_seller_single_product_details,
};
