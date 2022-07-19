const cartRouter = require("express").Router();
const cartController = require("../controllers/cartController");

cartRouter.post("/", cartController.addItemToCart);
cartRouter.get("/:cart_id", cartController.getCart);
cartRouter.delete("/empty-cart/:cart_id", cartController.emptyCart);
cartRouter.delete("/:cart_id/:device_id", cartController.removeItem);
module.exports = cartRouter;