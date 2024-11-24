import express from "express";
import {login, createUser, validateEmail, validateUsername, getInfo, createFollow, getFollowers } from "../controller/user.js";
import {Error} from '../error/error.js';
import {asyncHandler} from "../utils/asyncHandler.js"
import {authExpress} from "../auth/index.js";

const userRoute = express();


userRoute.post('/user/register', asyncHandler (async (req, res) => {
    if(!req.body){
        throw new Error(400, "body not available");
    }
    else if(!req.body.username || await validateUsername(req.body.username)){
        throw new Error(400, "username not available or already exists");
    }
    else if(!req.body.email || !await validateEmail(req.body.email)){
        throw new Error(400, "email not available or already exists");
    }
    else if(!req.body.password){
        throw new Error(400, "password not available");
    }
    else if(!req.body.lastname){
        throw new Error(400, "lastname not available");
    }
    else if(!req.body.firstname){
        throw new Error(400, "firstname not available");
    }
    else {   
        await createUser(req.body.username, req.body.email, req.body.password, req.body.lastname, req.body.firstname);
        res.status(204).json({});
    }
}));

userRoute.get('/user/auth', asyncHandler( async (req,res) =>{
    const { id, password } = req.query;
    
    
    if (id && password) {
        const token = await login(id, password);
        res.status(200).json({"token" : token})
    }
    else {
        throw new Error(400, "id or password is empty");
    }
}));

userRoute.use(authExpress);

userRoute.get('/user/getInfo', asyncHandler( async (req,res) =>{
    if(!req.body.id){
        throw new Error(400, "id is empty");
    }else if(req.body.id !== parseInt(req.body.id, 10)){
        throw new Error(400, "id is not INTEGER");
    }else{
        const data = await getInfo(req.body.id);
        res.status(200).json(data);
    }
}));


userRoute.post('/user/CreateFollow', asyncHandler( async (req,res) =>{
    if(req.body.followingId && req.body.followedId){
        await createFollow(req.body.followingId, req.body.followedId);
        res.status(204).json({})
    }
    else {
        throw new Error(400, "id or password is empty");
    }
}));


userRoute.get('/user/getFollowers', asyncHandler( async (req,res) =>{
    if(req.body.id){
        const followers = await getFollowers(req.body.id);
        res.status(200).json(followers);
    }
    else {
        throw new Error(400, "id or password is empty");
    }
}));

export default userRoute