import {Channels, User} from "../models/index.js";
import crypto from "crypto";
import {Error} from "../error/error.js";
import {Op} from "sequelize"

export async function createChannel(name, userId){
    try{
        const channel = await Channels.create({
            name: name ?? crypto.randomUUID(),
        });
        const user = await User.findOne({
            where:{
                id: userId
            }
        });
        await channel.addUser(user); 
        return channel;       
    }catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}

export async function addUserToChannel(userId, channelId){
    try{
        const user = await User.findOne({
            where:{
                id: userId
            }
        });
        const channel = await Channels.findOne({
            where:{
                id: channelId
            }
        });
        await channel.addUser(user);
    }catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}

export async function deleteUserFromChannel(userId, channelId){
    try{
        const user = await User.findOne({
            where:{
                id: userId
            }
        });
        const channel = await Channels.findOne({
            where:{
                id: channelId
            }
        });
        await channel.removeUser(user);
    }
    catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}


export async function getChannelsOfUser(userId){
    try{
        const user = await User.findOne({
            where:{
                id: userId
            }
        });
        const channels = await user.getChannels();
        return channels;
    }
    catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}