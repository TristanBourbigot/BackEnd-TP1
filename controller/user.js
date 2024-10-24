import {User} from "../models/index.js";
import bcrypt from "bcrypt";
import {Error} from "../error/error.js";
import jwt from "jsonwebtoken";
import {Op} from "sequelize"

const SECRET = 'test';
const saltRounds = 10;

function asyncCompare(password, userPassword){
    return new Promise((resolve, reject) =>{
        bcrypt.compare(password, userPassword,(err,data) =>{
            if(err) reject(err);
            else resolve(data);
        });
    });
}

function asyncCrypt(password){
    return new Promise((resolve, reject) =>{
        bcrypt.hash(password,saltRounds, (err,data) =>{
            if(err) reject(err);
            else resolve(data);
        });
    });
}

export async function login(id, password){
    try{             
        const user = await User.findOne({
            where:{
                [Op.or]: [
                    { username: id },
                    { email: id }
                ]
            } 
        });

        if(user){
            const data = await asyncCompare(password, user.password ?? "");
            const token = jwt.sign({ ...user }, SECRET);
            return token;
        }else{
            throw new Error(403, "Wrong id or password")
        }
    }catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}

export async function createUser(username, email, password){
    try{
        const user = await User.create({
            username: username,
            email: email,
            password: await asyncCrypt(password)
        });
    }catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}

export async function getInfo(id) {
    
    try{
        const user = await User.findOne({
            where:{
                id: id
            }
        });
        return user;
    }catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}


export async function createFollow(followingId, followedId) {
    
    try{
        const userFollowing = await getInfo(followingId);
        const userFollowed = await getInfo(followedId)
        await userFollowed.addFollowing(userFollowing);
    }catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}


export async function getFollowers(id){
    try {
        const followers = await User.findAll({
            where: {id : id},
            attributes: [],
            include: [
                {
                    model: User,
                    as: 'Followers',
                    attributes: ['username', 'profileImage', 'firstName', 'lastName', 'email' ],
                }
            ]
        });
        return followers
    } catch (err) {
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}