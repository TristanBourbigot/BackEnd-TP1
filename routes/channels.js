import express from "express";
import {createChannel, getChannelsOfUser, deleteUserFromChannel, addUserToChannel} from "../controller/channels.js"
import {Error} from '../error/error.js';
import {asyncHandler} from "../utils/asyncHandler.js"
import {websocket} from '../utils/websocket.js';

const channelRouter = express();

channelRouter.post('/channel/createChannel', asyncHandler( async (req,res) =>{
    if(req.body.name && req.body.userId){
       const channel =  await createChannel(req.body.name, req.body.userId);
        res.status(200).json(channel);
    }else if(req.body.userId){
        const channel = await createChannel(null, req.body.userId);
        res.status(200).json(channel);

    }else{
        throw new Error(400, "Invalid CreateChannel");
    }
}));

channelRouter.post('/channel/addUserToChannel', asyncHandler( async (req,res) =>{
    if(req.body.userId && req.body.channelId){
        await addUserToChannel(req.body.userId, req.body.channelId);
        res.status(204).json({});
    }else{
        throw new Error(400, "Invalid addUserToChannel");
    }
}));


channelRouter.delete('/channel/deleteUserFromChannel', asyncHandler( async (req,res) =>{
    if(req.body.userId && req.body.channelId){
        await deleteUserFromChannel(req.body.userId, req.body.channelId);
        res.status(204).json({});
    }else{
        throw new Error(400, "Invalid deleteUserFromChannel");
    }
}));

channelRouter.get('/channel/getChannelsOfUser', asyncHandler( async (req,res) =>{
    if(req.query.id){
        const channel = await getChannelsOfUser(req.query.id);
        res.status(200).json(channel);
    }else{
        throw new Error(400, "Invalid getChannelsOfUser");
    }
}));

channelRouter.get('/channel/Open', asyncHandler( async (req,res) =>{
    if (req.query.id) {
        const channel = await websocket.openChannel(req.query.id);
        res.status(200).json(channel);
    } else {
        throw new Error(400, "Invalid OpenChannel");
    }
}));

export default channelRouter;