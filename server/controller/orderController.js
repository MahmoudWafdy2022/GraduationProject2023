const asyncHandler = require("../middleware/asyncHandler.js");
const orderModel = require("../models/orderModel");
const httpStatusText = require("../utils/httpStatusText");
// const PayPalUtils = require("../utils/paypal");
// const { getPayPalAccessToken, checkIfNewTransaction, verifyPayPalPayment } =
//   PayPalUtils;
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
      user,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "No order items",
      });
    } else {
      const order = new orderModel({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),
        user,
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
      .populate("user.id", "name email");
    console.log(order);
    if (order) {
      return res
        .status(200)
        .json({ status: httpStatusText.SUCCESS, data: { order } });
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

const updateOrderToPaid = asyncHandler(async (req, res) => {
  // NOTE: here we need to verify the payment was made to PayPal before marking
  // the order as paid
  // const { verified, value } = await verifyPayPalPayment(req.body.id);
  // if (!verified) throw new Error("Payment not verified");

  // // check if this transaction has been used before
  // const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  // if (!isNewTransaction) throw new Error("Transaction has been used before");

  const order = await orderModel.findById(req.params.id);

  if (order) {
    // check the correct amount was paid

    // const paidCorrectAmount = order.totalPrice.toString() === value;
    // if (!paidCorrectAmount) throw new Error("Incorrect amount paid");

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// not check
const updateOrderToDeliverd = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      return res
        .status(200)
        .json({ status: httpStatusText.SUCCESS, data: { updatedOrder } });
    } else {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: null,
        msg: "order not found",
      });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ status: httpStatusText.ERROR, data: null, msg: err.message });
  }
};
// not check
const getOrders = async (req, res) => {
  try {
    const Orders = await orderModel.find({}).populate("user.id", "id name");

    res.status(200).json({ status: httpStatusText.SUCCESS, data: { Orders } });
  } catch (err) {
    res
      .status(401)
      .json({ status: httpStatusText.ERROR, data: null, msg: err.message });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliverd,
  getOrders,
};
