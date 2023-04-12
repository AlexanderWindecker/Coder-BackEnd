import { messageModel } from "./models/messages.model.js";

export default class MessageManager {
    async addMessage(obj) {
        try {
            const newMsg = await messageModel.create(obj);
            return newMsg;
        } catch (error) {
            console.log("Error al Agregar el Mensaje", error)
        }
    }

    async getMessages() {
        try {
            const messages = await messageModel.find({});
            return messages;
        } catch (error) {
            console.log("No se encuentran mensajes en la Base de Datos", error)
        }
    } 
}