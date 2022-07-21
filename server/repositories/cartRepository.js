const Cart = require("../models/cart");
exports.cart = async (id) => {
    console.log("cart id ",id);
    const carts = await Cart.findById(id).populate({
        path: "items.deviceId",
        select: `characteristics total`
    });
    console.log("cart ",carts);
    return carts;
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}