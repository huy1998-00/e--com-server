const Cart = require("../models/carts");
const Order = require("../models/orders");
const User = require("../models/user");
exports.histories = async (req, res, next) => {
  const idUser = req.query.idUser;
  try {
    const orders = await Order.find({ idUser: idUser });
    return res.status(200).json(orders);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.detailHistory = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);
    console.log(order);
    const cart = await Cart.find({ _id: order.cart }).populate("idProduct");
    order.cart = cart;
    res.status(200).json(order);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.dashBoard = async (req, res, next) => {
  const countUser = await User.find().countDocuments();
  const countOrder = await Order.find().countDocuments();
  const order = await Order.find();

  let total = 0;
  order.map((o) => {
    return (total += o.total);
  });

  return res
    .status(200)
    .json({
      countUser: countUser,
      countOrder: countOrder,
      order: order,
      total: total,
    });
};
