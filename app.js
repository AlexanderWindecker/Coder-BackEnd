//EXPRESS

import express from "express";

import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.router.js"

 
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/productos", productsRouter)
app.use("/api/carts", cartsRouter)


app.listen(8080, () => { 
  console.log("Escuchando puerto 8080 de express");
});

