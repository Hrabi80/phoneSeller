import Cart from '../../models/cart';
import { getAll, getByManager, getByUser,getByShop,getOne,getCount } from "./actions/get.action";
import { removeItem, emptyCart,update } from "./actions/update.action";
import { addItem } from "./actions/create.action";

import { deleteOne } from "./actions/delete.action";

import { ErrorHandler } from "../../utils/errorsHandler";

import { HttpStatusCode } from '../../utils/httpStatusCodes';


exports.addItem = (req, res, next) => {
    addItem(req, res, next)
};

exports.removeItem = (req, res, next) => {
    removeItem(req, res, next, Cart, ErrorHandler, HttpStatusCode);
};
exports.emptyCart = (req, res, next) => {
    emptyCart(req, res, next, Cart, ErrorHandler, HttpStatusCode);
};
exports.update = (req, res, next) => {
    update(req, res, next, Cart, ErrorHandler, HttpStatusCode);
};
exports.getAll = (req, res, next) => {
    getAll(req, res, next, Cart, ErrorHandler, HttpStatusCode);
};

exports.getByShop = (req, res, next) => {
    getByShop(req, res, next, Cart, ErrorHandler, HttpStatusCode);
};
exports.getOne = (req, res, next) => {
    getOne(req, res, next, Cart, ErrorHandler, HttpStatusCode);
};
exports.getByUser = (req, res, next) => {
    getByUser(req, res, next, Cart, ErrorHandler, HttpStatusCode);
};

exports.getByManager = (req, res, next) => {
    getByManager(req, res, next, Cart, ErrorHandler, HttpStatusCode);
};

exports.delete = (req, res, next) => {
    deleteOne(req, res, next, Cart, ErrorHandler, HttpStatusCode);
};

exports.getCount = (req, res, next) => {
    getCount(req, res, next, Cart, ErrorHandler, HttpStatusCode);
  };