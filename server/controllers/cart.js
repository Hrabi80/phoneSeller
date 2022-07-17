const CART = require('mongoose').model('Cart');
const DEVICE = require('mongoose').model('Device');
//const RECEIPT = require('mongoose').model('Receipt');
const USER = require('mongoose').model('User');

module.exports = {
    getCartSize: (req, res) => {
        let userId = req.user.id;
        CART.findOne({ user: userId }).then((cart) => {
            res.status(200).json({
                message: '',
                data: cart.devices.length
            });
        });
    },

    getCart: (req, res) => {
        let userId = req.user.id;

        CART.findOne({ user: userId })
            .populate('devices')
            .then((cart) => {
                res.status(200).json({
                    message: '',
                    data: cart
                });
            });
    },

    addToCart: (req, res) => {
        let userId = req.user.id;
        let deviceId = req.params.deviceId;

        DEVICE.findById(deviceId).then((device) => {
            if (!device) {
                return res.status(400).json({
                    message: 'There is no device with the given id in our database.'
                });
            }

            CART.findOne({ user: userId }).then((cart) => {
                let deviceIds = [];

                for (let b of cart.devices) {
                    deviceIds.push(b.toString());
                }

                if (deviceIds.indexOf(deviceId) !== -1) {
                    return res.status(400).json({
                        message: 'Device is already in your cart'
                    });
                }

                cart.devices.push(deviceId);
                cart.totalPrice += device.price;
                cart.save();

                res.status(200).json({
                    message: 'Device added to cart!',
                    data: cart
                });
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    removeFromCart: (req, res) => {
        let userId = req.user.id;
        let deviceId = req.params.deviceId;

        DEVICE.findById(deviceId).then((device) => {
            if (!device) {
                return res.status(400).json({
                    message: 'There is no device with the given id in our database.'
                });
            }

            CART.findOne({ user: userId }).then((cart) => {
                cart.devices = cart.devices
                    .map(b => b.toString())
                    .filter(b => b !== deviceId);
                cart.totalPrice -= device.price;
                cart.save();

                res.status(200).json({
                    message: 'Device removed from cart!',
                    data: cart
                });
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    checkout: (req, res) => {
        let userId = req.user.id;
        let totalPrice = 0;
        let devices = [];

        CART
            .findOne({ user: userId })
            .populate('devices')
            .then((cart) => {
                for (let device of cart.devices) {
                    totalPrice += device.price * req.body[device._id.toString()];
                    products.push({
                        id: device._id,
                        title: book.title,
                        author: book.author,
                        cover: book.cover,
                        price: book.price,
                        qty: req.body[book._id.toString()]
                    });
                }

                RECEIPT.create({
                    user: userId,
                    productsInfo: products,
                    totalPrice: totalPrice
                }).then((receipt) => {
                    USER.update({ _id: userId }, { $push: { receipts: receipt._id } }).then(() => {
                        cart.books = [];
                        cart.totalPrice = 0;
                        cart.save();
                        return res.status(200).json({
                            message: 'Thank you for your order! Books will be sent to you as soon as possible!',
                            data: receipt
                        });
                    });
                }).catch((err) => {
                    console.log(err);
                    return res.status(400).json({
                        message: 'Something went wrong, please try again.'
                    });
                });
            });
    }
};