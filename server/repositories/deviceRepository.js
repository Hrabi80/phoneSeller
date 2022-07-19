const Product = require("../models/product");
const Device = require("../models/device");
exports.deviceById = async (id) => {
    const mydevice = await Device.findById(id).populate({
        path: "productId._id",
        select: 'name photo'
    });
    return mydevice;
};
