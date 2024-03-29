import { usersModel } from "../../mongoDB/models/users.model.js";
import { hashPassword, comparePasswords } from "../../../utils.js"
import { addCartService } from "../../../service/carts.services.js";
import config from "../../../../config.js";
import UsersDTO from "../../DTOs/users.dto.js";
import AdminDTO from "../../DTOs/admin.dto.js";
import nodemailer from 'nodemailer';
import logger from "../../../winston/winston.js";

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.googleEmail,
        pass: config.googlePassword
    }
})

export default class UserManager {
    async createUser(user) {
        const {email, password} = user;
        try {
            const userExists = await usersModel.find({email}); 
            if(userExists.length === 0) {
                const newCart = await addCartService()
                const hashNewPassword = await hashPassword(password)
                const newUser = {...user, password: hashNewPassword, cart: newCart._id}
                await usersModel.create(newUser);
                return newUser;
            } else {
                return null;
            }
        } catch (error) {
            logger.error("Error en la creación del usuario", error)
        }
    }

    async loginUser(user) {
        const { email, password } = user;
        if(email === config.adminEmail && password === config.adminPassword) {
            const adminDTO = new AdminDTO(email)
            return adminDTO;
        } else {
            const userOne = await usersModel.findOne({ email });
            if(userOne) {
                const isPassword = await comparePasswords(password, userOne.password);
                if(isPassword) {
                    const userDTO = new UsersDTO(userOne)
                    return userDTO;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } 
    }

    async getUserByEmail(email) {
        try {
            const users = await usersModel.findOne({ email });
            return users;
        } catch (error) {
            logger.info("Id no encontrado", error)
        }
    }

    async getProfileUser(user) {
        const email = user;
        if(email === config.adminEmail) {
            const adminDTO = new AdminDTO(email)
            return adminDTO;
        } else {
            const userOne = await usersModel.findOne({ email });
            if(userOne) {
                const userDTO = new UsersDTO(userOne)
                return userDTO;
            } else {
                return null;
            }
        }
    }
    
    async getMail(userEmail) {
        let result = await transport.sendMail({
            from: "$neakers",
            to: userEmail,
            subject: 'Check Login',
            html: `
                <div>
                    <p>¡Te has logeado correctamente en $neakers!</p>
                </div>
            `
        })
        return result;
    }
}