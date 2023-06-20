import { Server } from "socket.io";

import ProductManager from "../classes/productsManager.js";

import { MsgModel } from "../DAO/models/msgs.models.js";
const productManager = new ProductManager("./src/data/products.json");

export function connectSocketServer(httpServer) {
  const socketServer = new Server(httpServer);
  socketServer.on("connection", (socket) => {
    const emitProductList = async () => {
      const productsList = await productManager.getProducts();
      socket.emit("new-products-list", productsList);
    };
    emitProductList();
    //console.log("listPRoducts");
    socket.on("add-product", async (newProduct) => {
      try {
        console.log(newProduct);
        await productManager.addProduct(newProduct);
        emitProductList();
      } catch (err) {
        console.log(err);
      }
    });
    socket.on("delete-product", async (productId) => {
      try {
        await productManager.deleteProduct(productId);
        console.log(`Producto eliminado ID:${productId}`);
        emitProductList();
      } catch (err) {
        console.log(err);
      }
    });
    //SOCKET CHAT
    socket.on("msg-chat", async (msg) => {
      try {
        await MsgModel.create(msg);
        const chat = await MsgModel.find({});
        socketServer.emit("list-chat", chat);
      } catch (err) {
        console.log(err);
      }
    });
  });
}
