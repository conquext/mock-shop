import db from "../models/index";
const { Cart } = db;

export default class CartUtils {
  static async createCart(cartData) {
    try {
      const newCart = await Cart.create(cartData);
      return newCart;
    } catch (error) {
      throw error;
    }
  }

  static async findOrCreateCart(cartData) {
    try {
      const newCart = await Cart.findOrCreate({
        where: { id: cartData.id }
      });
      return newCart;
    } catch (error) {
      throw error;
    }
  }

  static async updateCart(id, updates) {
    try {
      const cartToUpdate = await CartUtils.findCart("id", id);
      let cart;

      if (cartToUpdate) {
        cart = await Cart.update(updates, {
          where: { id },
          attributes: {
            exclude: ["id"]
          },
          returning: true
        });
        return cart;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findCart(key, value) {
    let cart;
    try {
      cart = await Cart.findOne({
        where: {
          [key]: value
        }
      });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  static async findAllCarts(key, value) {
    let cart;
    try {
      if (!key && !value) {
        cart = await cart.findAll({ raw: true });
      } else {
        if (value) {
          cart = await Cart.findAll({
            where: {
              [key]: value
            }
          });
        } else {
          if (Object.keys(key).length > 0) {
            cart = await Cart.findAll({
              where: key
            });
          }
        }
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  static async getCartField(withoutId, body) {
    const data = {};
    let acceptedFields = ["id", "userId", "price", "quantity"];
    if (withoutId)
      acceptedFields = acceptedFields.filter(field => field !== "id");
    Object.entries(body).forEach(([key, value]) => {
      if (acceptedFields.includes(key)) {
        data[key] = value;
      }
    });
    return data;
  }

  static getCartDisplayInfo(body, includeTotal) {
    try {
      const data = [];
      let acceptedFields = ["productId", "price", "quantity", "updatedAt"];

      body.forEach((b, i) => {
        let tempObj = {};
        Object.entries(b).forEach(([key, value]) => {
          if (acceptedFields.includes(key)) {
            tempObj[key] = value;
          }
        });
        data.push(tempObj);
      });

      if (includeTotal) {
        let totalInfo = {};
        totalInfo["itemsInCart"] = data.length;
        totalInfo["totalPrice"] = data.reduce(
          (acc, cur) => acc + cur.price * cur.quantity,
          0
        );
        data.push(totalInfo);
      }
      return data;
    } catch (err) {
      throw error;
    }
  }
}
