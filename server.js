import  express  from "express";

import productosRouter from "/routes/products.router.js "
import cartsRouter from "/routes/carts.router.js "

const app = Express()

import {dirname} from "path"
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(express.static(__dirname+"/public"))

app.use("api/productos",productosRouter) 


app.use("api/carts",cartsRouter)




app.listen (8080, () =>{
    console.log("escuchando el puerto 8080");
} )