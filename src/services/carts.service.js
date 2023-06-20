import { CartsModel } from "../DAO/models/carts.models.js";

class CartService {
  async getAll() {
    const carts = await CartsModel.find({}); /* .populate("products.product") */
    if (!carts) {
      throw new Error("carts not found.");
    }
    return carts;
  }

  async getOne(cid) {
    const cart = await CartsModel.findById(cid).populate("products.product");
    console.log(cart);
    if (!cart) {
      throw new Error("cart not found.");
    }
    return cart;
  }

  async deleteCart(cid) {
    const deleteCart = await CartsModel.findById(cid);
    if (deleteCart) {
      deleteCart.products = [];
      await deleteCart.save();
      return deleteCart;
    } else {
      throw new Error("cant clear cart.");
    }
  }

  async createCart() {
    const newCart = await CartsModel.create({});
    if (!newCart) {
      throw new Error("cant create.");
    }
    return newCart;
  }

  async addToCart(cid, pid) {
    const cart = await CartsModel.findById(cid);
    if (!cart) {
      throw new Error("cart not found.");
    }
    const cartUpdate = cart.products.find((p) => p.product == pid);
    console.log(cartUpdate);
    if (!cartUpdate) {
      cart.products.push({ product: pid });
      const res = await CartsModel.updateOne({ _id: cid }, cart);
      return res;
    } else {
      cartUpdate.quantity++;
      const res = await CartsModel.updateOne({ _id: cid }, cart);
      return res;
    }
  }
}

export const cartService = new CartService();
