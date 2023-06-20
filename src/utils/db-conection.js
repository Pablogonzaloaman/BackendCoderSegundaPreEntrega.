import { connect } from "mongoose";
import { CartsModel } from "../DAO/models/carts.models.js";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://amanpablogonzalo:1nllT06rsJAo4LXs@cluster0.d8wem2c.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "cluster0",
      }
    );
    console.log("plug to mongo!");
    /* const create = await CartsModel.create({}); */
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
