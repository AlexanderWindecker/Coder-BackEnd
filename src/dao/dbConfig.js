import mongoose from "mongoose";

const URI =
  "mongodb+srv://Alex:Lospiojos87@cluster0.itypvvb.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.connect(URI, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("conectado con exito");
  }
});
