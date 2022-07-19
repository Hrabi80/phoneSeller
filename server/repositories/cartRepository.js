const Cart = require("../models/cart");
exports.cart = async (id) => {
    const carts = await Cart.findById(id).populate({
        path: "items.deviceId",
        select: `characteristics total`
    });
    return carts;
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}