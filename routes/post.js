import express from "express";
import {createPost, createComment, getComment, getPostsOfUser, getFeed} from "../controller/post.js"
import {Error} from '../error/error.js';
import {asyncHandler} from "../utils/asyncHandler.js"
import {auth} from "../auth/index.js";

const postRouter = express();


postRouter.use(auth);

postRouter.post('/post/CreatePost', asyncHandler( async (req,res) =>{
    if(req.body.body && req.body.latitude && req.body.longitude && req.body.userId){
        await createPost(req.body.body, req.body.latitude, req.body.longitude, req.body.userId);
        res.status(204).json({});
    }else{
        throw new Error(400, "Invalid CreatePost");
    }
}));

postRouter.post('/post/CreateComment', asyncHandler( async (req,res) =>{
    if(req.body.body && req.body.latitude && req.body.longitude && req.body.userId && req.body.postId){
        await createComment(req.body.body, req.body.latitude, req.body.longitude, req.body.userId, req.body.postId);
        res.status(204).json({});
    }else{
        throw new Error(400, "Invalid CreatePost");
    }
}));

postRouter.get('/post/getComment', asyncHandler( async (req,res) =>{
    if(req.body.id){
        const comment = await getComment(req.body.id);
        res.status(200).json(comment);
    }else{
        throw new Error(400, "Invalid CreatePost");
    }
}));


postRouter.get('/post/getPostsOfUser', asyncHandler( async (req,res) =>{
    if(req.body.id){
        const comment = await getPostsOfUser(req.body.id);
        res.status(200).json(comment);
    }else{
        throw new Error(400, "Invalid CreatePost");
    }
}));


postRouter.get('/post/getFeed', asyncHandler( async (req,res) =>{
    if(req.body.id){
        const comment = await getFeed(req.body.id);
        res.status(200).json(comment);
    }else{
        throw new Error(400, "Invalid CreatePost");
    }
}));

export default postRouter