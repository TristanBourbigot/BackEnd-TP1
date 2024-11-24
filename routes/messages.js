import express from "express";
import {createMessage, getMessagesOfChannel} from "../controller/messages.js";
import {Error} from '../error/error.js';
import {asyncHandler} from "../utils/asyncHandler.js";

const messageRouter = express();

messageRouter.post('/message/createMessage', asyncHandler( async (req,res) =>{
    if(req.body.userId && req.body.channelId && req.body.message){
        await createMessage(req.body.userId, req.body.channelId, req.body.message);
        res.status(204).json({});
    }else{
        throw new Error(400, "Invalid CreateMessage");
    }
}));

messageRouter.get('/message/getMessagesOfChannel', asyncHandler( async (req,res) =>{
    if(req.query.id){
        const messages = await getMessagesOfChannel(req.query.id);
        res.status(200).json(messages);
    }else{
        throw new Error(400, "Invalid getMessagesOfChannel");
    }
}));

export default messageRouter;