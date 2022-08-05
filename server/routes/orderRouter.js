const orderRouter = require("express").Router();
var authenticate = require('../authenticate');
const orderController = require("../controllers/orderController");

orderRouter.post("/", orderController.createOrder);
orderRouter.get("/", orderController.getOrders);
orderRouter.get("/:order_id", orderController.getOrderById);
orderRouter.get("/user/:user_id", orderController.getOrderByUser);
orderRouter.put("/:order_id", orderController.UpdateOrder);
orderRouter.delete("/delete-order/:cart_id", orderController.deleteOrder);
module.exports = orderRouter;