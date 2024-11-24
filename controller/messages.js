import {Messages, Channels, User} from "../models/index.js";
import {Error} from "../error/error.js";
import {Op} from "sequelize"

export async function createMessage(userId, channelId, msg){
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
        if(!channel){
            throw new Error(404, "Channel not found");
        }
        if(!user){
            throw new Error(404, "User not found");
        }
        const userChannel = await user.getChannels({
            where: {
                id: channelId
            }
        });
        if (userChannel.length === 0) {
            throw new Error(403, "User is not associated with the channel");
        }
        const message = await Messages.create({
            message: msg,
        });
        await message.setUser(user);
        await message.setChannel(channel);
    }
    catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}

export async function getMessagesOfChannel(channelId){
    try{
        const messages = await Messages.findAll({
            where:{
                channelId: channelId
            }
        });
        return messages;
    }
    catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}
