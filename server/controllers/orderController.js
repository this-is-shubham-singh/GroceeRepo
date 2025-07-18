import Order from "../models/orderModel.js";

const placeOrderCod = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.json({ success: false, message: "user unauthorized" });
    }

    // items: [
    //   {
    //     productId: productid,
    //     quantity: 2
    //   },
    //   {
    //     productId: productid,
    //     quantity: 4,
    //   },
    // ];

    const { items, addressId, paymentMethod, amount } = req.body;
    if (!items || !addressId || !paymentMethod || !amount) {
      return res.json({ success: false, message: "invalid details" });
    }

    // AMOUNT CALCULATION
    // -> amount should be recalculated in the backend
    // -> but as all my products are not in the backend i ll count in the client side only
    // -> this code is the right way to calculate amount in backend

    // const arrayOfAmount = await Promise.all(
    //   items.map(async (val, index) => {
    //     const productDetails = await Product.findById(val.productId);
    //     return productDetails.offerPrice * val.quantity;
    //   })
    // );

    // const amount = arrayOfAmount.reduce((acc, val) => acc + val, 0);

    await Order.create({ userId: id, items, amount, addressId, paymentMethod });

    return res.json({
      success: true,
      message: "order placed successfully ",
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.json({ success: false, message: e.message });
    }

    const response = await Order.find({ userId: id })
      .populate("userId")
      .populate("addressId");
    if (!response) {
      return res.json({
        success: false,
        message: "no order exist for this user",
      });
    }

    return res.json({
      success: true,
      message: "all orders of user",
      allOrders: response,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

const getAllUsersOrder = async (req, res) => {
  try {
    const response = await Order.find({})
      .populate("userId")
      .populate("addressId");
    if (!response) {
      return res.json({ success: false, message: "no orders exist" });
    }

    return res.json({
      success: true,
      message: "orders of all users",
      allOrders: response,
    });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

export { placeOrderCod, getAllOrders, getAllUsersOrder };
