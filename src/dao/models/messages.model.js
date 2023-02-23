import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
    unique: true,
  },
  message: {
    type: String,
    requerid: true,
  },
});

export const messageModel = mongoose.model("messages", messagesSchema);
