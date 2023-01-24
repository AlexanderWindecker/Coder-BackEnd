//EXPRESS

import express from "express";
import ProductManager from "./ProductManager.js";
const app = express();

//Rutas

const productManager = new ProductManager("Item.json");

const productos = [
  { id: 1, name: "licuadora", price: 9000, category: "PAE" },
  { id: 2, name: "Televisor", price: 34000, category: "Imagen" },
  { id: 3, name: "Monitor", price: 24000, category: "Imagen" },
  { id: 4, name: "Heladera", price: 134000, category: "Refrigeracion" },
  { id: 5, name: "Plancha", price: 4000, category: "PAE" },
];

//Get

app.get("/", (req, res) => {
  res.send("Ruta raiz");
});

//Todos los productos
app.get("/productos", async (req, res) => {
  const { limit} = req.query;
  const productLimit = productos.slice(0, limit);
  if (productLimit) {
    res.json({
      message: "Producto encontrado con exito",
      productos: productLimit,
    });
  } else {
    res.json({ message: "Producto encontrado con exito", productos });
  }
});

//Producto unico
app.get("/productos/:idProducto", (req, res) => {
  const { idProducto } = req.params;
  const producto = productos.find(p => p.id === parseInt(idProducto));
  if (producto) {
    res.json({ message: "Producto encontrado: ", producto });
  } else {
    res.json({ message: "Producto no encontrado" });
  }
});

app.get("/clientes", (req, res) => {
  res.send("Ruta de clientes");
});

app.listen(8080, () => {
  console.log("Escuchando puerto 8080 de express");
});
