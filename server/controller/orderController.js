const orderModel = require("../models/orderModel");
const httpStatusText = require("../utils/httpStatusText");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "No order items",
      });
    } else {
      console.log(req);
      const order = new orderModel({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),
        user: req.currentUser.id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      return res
        .status(201)
        .json({ status: httpStatusText.SUCCESS, data: { createdOrder } });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, msg: err.message });
  }
};

// @desc   get logged in users orders
// @route   GET /api/myorders
// @access  Private

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user._id });
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { orders } });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, msg: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name email");
    if (order) {
      return res
        .status(200)
        .json({ status: httpStatusText.FAIL, data: { order } });
    } else {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "Order not found",
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, msg: err.message });
  }
};

const updateOrderToPaid = async (req, res) => {
  res.send("update order to paid");
};

const updateOrderToDeliverd = async (req, res) => {
  res.send("update order to delivered");
};

const getOrders = async (req, res) => {
  res.send("get orders");
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliverd,
  getOrders,
};
