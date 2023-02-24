const Cart = require("../models/carts");

exports.getCarts = async (req, res, next) => {
  const idUser = req.query.idUser;
  try {
    const carts = await (
      await Cart.find({ idUser: idUser }).populate("idProduct")
    ).filter((cart) => cart.orderStatus !== true);
    res.status(200).json(carts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// add product
exports.addCart = async (req, res, next) => {
  const idUser = req.query.idUser;
  const idProduct = req.query.idProduct;
  const count = req.query.count;
  try {
    // check san pham
    const cart = await Cart.findOne({
      idUser: idUser,
      idProduct: idProduct,
      orderStatus: false,
    });
    if (cart) {
      //tang so luong neu sp da co trong cart
      await Cart.findByIdAndUpdate(cart._id, {
        count: cart.count + parseInt(count),
      });
      return res.status(200).send("Cart Added!");
    } else {
      // them moi sp
      const newCart = new Cart({
        idUser: idUser,
        idProduct: idProduct,
        count: count,
        orderStatus: false,
      });
      await newCart.save();
      return res.status(200).send("Cart Added!");
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// update count
exports.updateCart = async (req, res, next) => {
  const idUser = req.query.idUser;
  const idProduct = req.query.idProduct;
  const count = req.query.count;
  try {
    await Cart.findOneAndUpdate(
      { idUser: idUser, idProduct: idProduct, orderStatus: false },
      { count: count }
    );
    res.status(200).send("Cart updated!");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//delete product

exports.deleteCart = async (req, res, next) => {
  const idUser = req.query.idUser;
  const idProduct = req.query.idProduct;
  try {
    await Cart.findOneAndDelete({
      idUser: idUser,
      idProduct: idProduct,
      orderStatus: false,
    });
    res.status(200).send("Cart Deleted!");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
