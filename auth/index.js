import jwt from "jsonwebtoken";
import { Error } from "../error/error.js";
const SECRET = "test";

export const authExpress = (req, res, next) => {
    const headers = req.headers;
    const token = headers?.authorization?.split(" ")[1] ?? "";
    if (token) {
        try {
            const user = jwt.verify(token, SECRET);
            req.user = { ...user };
            next();
        }
        catch (err) {
            throw new Error(401, "Unauthorized");
        }
    }
    else {
        throw new Error(401, "Unauthorized");
    }
}


export const authSocket = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
        try {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    return next(new Error('Unauthorized: Invalid token'));
                }
            
                socket.user = decoded;
                next();
            });
        } catch (err) {
            return next(new Error('Unauthorized: Invalid token'));
        }
    } else {
        return next(new Error('Unauthorized: No token provided'));
    }
};