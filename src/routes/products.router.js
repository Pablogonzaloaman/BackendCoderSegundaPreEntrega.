import express from "express";
import { productService } from "../services/products.service.js";

export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const queryParams = req.query;
    const products = await productService.getAll(queryParams);
    return res.status(200).json({
      status: "success",
      msg: "list products.",
      payload: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      payload: {},
    });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.getOne(pid);
    return res.status(200).json({
      status: "succes",
      msg: "product found.",
      payload: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      msg: error.message,
      payload: {},
    });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const deleteProduct = await productService.deleteOne(pid);
    return res.status(200).json({
      status: "succes",
      msg: "product deleted.",
      payload: deleteProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error.",
      msg: error.message,
      payload: {},
    });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const productCreated = await productService.createOne(body);
    return res.status(201).json({
      status: "success",
      msg: "product created.",
      payload: productCreated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      payload: {},
    });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    const productUpdate = await productService.updateOne(pid, body);
    return res.status(201).json({
      status: "succes",
      msg: "product updated.",
      payload: productUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      payload: {},
    });
  }
});
