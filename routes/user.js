import express from "express";
import {login, createUser, getInfo } from "../controller/user.js";
import {Error} from '../error/error.js';
import {asyncHandler} from "../utils/asyncHandler.js"
import {validateEmail} from "../utils/email.js"
import {auth} from "../auth/index.js";

const userRoute = express();


userRoute.post('/user/register', asyncHandler (async (req, res) => {
    if (req.body && req.body.username && req.body.email && validateEmail(req.body.email) && req.body.password) {
        await createUser(req.body.username, req.body.email, req.body.password);
        res.status(204).json({});
    }
    else {
        throw new Error(400, "email or password not available");
    }
}));

userRoute.get('/user/auth', asyncHandler( async (req,res) =>{
    if(req.body && req.body.id && req.body.password){
        const token = await login(req.body.id, req.body.password);
        res.status(200).json({"token" : token})
    }
    else {
        throw new Error(400, "id or password is empty");
    }
}));

userRoute.use(auth);

userRoute.get('/user/getInfo', asyncHandler( async (req,res) =>{
    console.log( )
    if(!req.body.id){
        throw new Error(400, "id is empty");
    }else if(req.body.id !== parseInt(req.body.id, 10)){
        throw new Error(400, "id is not INTEGER");
    }else{
        const data = await getInfo(req.body.id);
    }
}));

export default userRoute