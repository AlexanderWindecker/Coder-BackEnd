import { Router } from "express";
import CartManager from "../dao/mongoManagers/CartManager.js";
import ProductManager from "../dao/mongoManagers/ProductManager.js";
//import CartManager from "../dao/fileManagers/CartManager.js";
//import ProductManager from "../dao/fileManagers/ProductManager.js"

const router = Router();
const cartManager = new CartManager("../carts.json");
const productManager = new ProductManager("../products.json");

router.post("/", async (req, res) => {
  const cart = req.body;
  const generateCart = await cartManager.addCart(cart);
  res.json(generateCart);
});
router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.json(carts);
});
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const idCart = await cartManager.getCartById(parseInt(cid));
  if (!idCart) {
    res.json({ message: "ID no encontrada" });
  } else {
    res.json(idCart);
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const allIds = await productManager.getProducts();
  const prdtId = allIds.find((elm) => elm.id === parseInt(pid));
  if (prdtId) {
    const response = await cartManager.addToCart(parseInt(cid), parseInt(pid));
    res.json(response);
  } else {
    res.json({ message: "Id no encontrada" });
  }
});
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cartDel = await cartManager.deletePrdcCart(cid, pid);
  res.json(cartDel);
});

export default router;
