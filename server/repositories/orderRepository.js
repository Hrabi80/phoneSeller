const Order = require("../models/order");
exports.cart = async (id) => {
    const carts = await Order.findById(id).populate({
        path: "items.deviceId",
        select: `characteristics total _id`,
    });

    return carts;
};
exports.createOrder = async payload => {
    const neworder = await Order.create(payload);
    return neworder;
}