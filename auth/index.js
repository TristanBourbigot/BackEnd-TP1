import jwt from "jsonwebtoken";
import { Error } from "../error/error.js";
const SECRET = "mysupersecretkey";

export const auth = (req, res, next) => {
    const headers = req.headers;
    const token = headers?.authorization?.split(" ")[1] ?? "";
    
    if (token) {
        try {
            const user = jwt.decode(token, SECRET);
            req.user = { ...user };
            next();
        }
        catch (err) {
            throw new Error(403, "Authentication KO");
        }
    }
    else {
        throw new Error(401, "Unauthorized");
    }
}