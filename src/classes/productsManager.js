import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.readProducts();
  }

  async readProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      if (data) {
        this.products = JSON.parse(data);
      }
    } catch (err) {
      console.log("No se pudo leer el archivo productos.");
    }
  }

  async writeProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
    } catch (err) {
      console.log("No se pudo escribir el archivo productos.");
    }
  }

  async getProducts(limit) {
    if (limit) {
      const productsLimited = this.products.slice(0, limit);
      return productsLimited;
    } else {
      return this.products;
    }
  }

  async getProductById(pid) {
    const findProduct = this.products.find((product) => product.pid == pid);
    if (findProduct) {
      return findProduct;
    } else {
      throw new Error("Producto no encontrado.");
    }
  }

  async deleteProduct(pid) {
    let index = this.products.findIndex((product) => product.pid == pid);
    //console.log(index);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1);
      await this.writeProducts();
      return deletedProduct;
    } else {
      throw new Error("Producto no encontrado para borrar.");
    }
  }

  async addProduct(body) {
    //console.log(body.code);
    console.log("HOLA");
    let generateId = uuidv4();
    let repeatCode = this.products.find((product) => product.code == body.code)
      ? true
      : false;
    let thumbnails = body.thumbnails ? body.thumbnails : [];
    const newProduct = {
      pid: generateId,
      createdAt: Date.now(),
      status: true,
      thumbnails,
      ...body,
    };
    //console.log(newProduct);
    if (
      !body.title ||
      !body.description ||
      !body.category ||
      !body.price ||
      !body.code ||
      !body.stock
    ) {
      throw new Error("Todos los campos son obligatorios.");
    } else if (repeatCode === true) {
      throw new Error("Codigo de producto ya ingresado.");
    } else {
      this.products.push(newProduct);
      await this.writeProducts();
      console.log("HOLA 2");
      return newProduct;
    }
  }

  async updateProduct(pid, body) {
    const productIndex = this.products.findIndex(
      (product) => product.pid == pid
    );
    if (productIndex == -1) {
      throw new Error("No se pudo actualizar el producto.");
    }
    const updatedProduct = { ...this.products[productIndex], ...body };
    this.products[productIndex] = updatedProduct;
    await this.writeProducts();
    return updatedProduct;
  }
}
