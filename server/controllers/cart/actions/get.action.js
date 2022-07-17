import Cart from "../../../models/cart";

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

export async function getAll(
  req,
  res,
  next,
  Cart,
  ErrorHandler,
  HttpStatusCode
) {

  const filter = {};

  let counts = await Cart.countDocuments(filter);
  try {
    Cart.find(filter)
      .populate([
        { path: "items.item", populate: "picture" },
        {
          path: "owner",
          select: "profile email",
          populate: "address profile.picture",
        },
      ])
      .exec()
      .then((cart) => {
        if (!cart) {
          return next(new ErrorHandler(HttpStatusCode.INTERNAL_SERVER));
        }
        res.status(HttpStatusCode.OK).json({ cart, counts });
      });
  } catch (error) {
    console.log("catch error", error);
  }
}

export async function getByUser(
  req,
  res,
  next,
  Cart,
  ErrorHandler,
  HttpStatusCode
) {
  let owner = req.user?._id;
  let filter = {};

  if (req.params.id) {
    owner = req.params.id;
    filter = { owner: owner };
  } else
    filter = req.user
      ? { owner: owner, isDeleted: false, isVerified: false }
      : {
          "guest.sessionID": req.sessionID,
          isDeleted: false,
          isVerified: false,
        };

  const sort = {};

  if (Object.keys(req.query).length !== 0) {
    dynamicFilter(req.query, sort, filter);
  }
  let counts = await Cart.countDocuments(filter);

  try {
    Cart.find(filter)
      .populate([
        { path: "items.item", populate: "picture" },
        {
          path: "shop",
          select: "name address deliveryFee deliverySupplyFee",
          populate: "address",
        },
        { path: "owner", populate: "profile.picture" },
      ])
      .skip(offset)
      .limit(size)
      .sort(sort)
      .exec()
      .then((carts) => {
        if (!carts) {
          return next(new ErrorHandler(HttpStatusCode.INTERNAL_SERVER));
        }
        let cartList = [];
        for (const cart of carts) {
          let newCart = cart;
          let newShop = newCart.shop;
          if (newShop && newShop.address?.location.coordinates) {
            let address = newShop.address;
            let location = {
              latitude: address.location.coordinates[0],
              longitude: address.location.coordinates[1],
            };
            let newAddress = { ...address._doc, location };
            delete newShop.address;
            delete newCart.restaurant;
            newShop = { ...newShop._doc, address: newAddress };
            newCart = { ...newCart._doc, shop: newShop };
          }
          cartList.push(newCart);
        }

        res.status(HttpStatusCode.OK).json({ cart: cartList, counts });
      });
  } catch (error) {
    console.log("catch error", error);
  }
}



export function getOne(req, res, next, Cart, ErrorHandler, HttpStatusCode) {
  try {
    Cart.findById(req.params.id, async (err, cart) => {
      if (err) {
        return next(new ErrorHandler(HttpStatusCode.INTERNAL_SERVER, err));
      }
      res.status(HttpStatusCode.OK).json({ cart });
    }).populate([
      // { path: "items.item", populate: "picture plates price" },
      { path: "items.item", populate: "picture price" },
      {
        path: "shop",
        select: "name deliveryFee deliverySupplyFee",
        populate: "address logo",
      },
    ]);
  } catch (error) {
    console.log("catch error", error);
  }
}

export async function updateCartPrice(cart) {
  try {
    for (let i = 0; i < cart.length; i++) {
      let totalPrice = 0;

      for (let j = 0; j < cart[i].items.length; j++) {
        let newPrice = await totalPriceItem(
          cart[i].items[j].type,
          cart[i].items[j].item._id,
          cart[i].items[j].quantity
        );
        cart[i].items[j].itemsPrice = newPrice;
        totalPrice += newPrice;
      }

      cart[i].totalPrice = totalPrice;

      Cart.updateOne({ _id: cart[i]._id }, { $set: cart[i] }).exec();
      //   totalPrice = 0;
      return cart;
    }
  } catch (error) {
    console.log("catch error", error);
  }
}

export async function totalPriceItem(model, idItem, quantity) {
  try {
    const collection = mongoose.model(model);
    let totalPrice = 0;
    let priceItem = {};
    let item = await collection.findOne({ _id: idItem });
    if (item) priceItem = await Price.findOne({ _id: item.price });
    //  if (!item) return next(new ErrorHandler(HttpStatusCode.NOT_FOUND, { msg: 'item not found' }));
    //   else if (!priceItem) return next(new ErrorHandler(HttpStatusCode.NOT_FOUND, { msg: 'price not found' }));

    if (priceItem) {
      if (priceItem.isPromo) totalPrice = priceItem.pricePromo * quantity;
      else totalPrice = priceItem.price * quantity;
    }

    return totalPrice;
  } catch (error) {
    console.log("catch error", error);
  }
}
export async function getCount(
  req,
  res,
  next,
  Cart,
  ErrorHandler,
  HttpStatusCode
) {
  let carts = [];
  const moment = require("moment");

  try {
    for (let day = 0; day < 7; day++) {
      var currentDay = moment()
        .subtract(day, "days")
        .format("YYYY-MM-DD")
        .toString();
      let cart = await Cart.aggregate([
        {
          $addFields: {
            creationDate: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
          },
        },
        {
          $match: {
            creationDate: { $eq: currentDay },
          },
        },
        {
          $group: {
            _id: {
              date: currentDay,
            },
            total: { $sum: "$totalPrice" },
            count: { $sum: 1 },
          },
        },
      ]);
      if (cart.length == 0) cart.push({ count: 0, date: currentDay });
      carts.push(...cart);
    }

    res.status(HttpStatusCode.OK).json({ carts });
  } catch (error) {
    console.log("catch error", error);
  }
}
