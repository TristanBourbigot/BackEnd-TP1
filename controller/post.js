import {Posts, User} from "../models/index.js";
import {Error} from "../error/error.js";
import {Op} from "sequelize"


export async function createPost(body, latitude, longitude, userId){
    try{
        await Posts.create({
            body: body,
            latitude: latitude,
            longitude: longitude,
            UserId: userId,
        });
    }catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}


export async function createComment(body, latitude, longitude, userId, postId){
    try{
        const comment = await Posts.create({
            body: body,
            latitude: latitude,
            longitude: longitude,
            UserId: userId,
        });
        const post = await Posts.findOne({
            where:{
                id: postId
            }
        });
        await post.addCommentingPosts(comment);
    }catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}



export async function getComment(postId){
    try{
        const post = await Posts.findAll({
            where: { id: postId },
            include: [
                {
                    model: Posts,
                    attributes: ['id', 'body', 'latitude', 'longitude', 'UserId'],
                    as: 'commentingPosts',
                    include: [
                        {
                            model: User,
                            as: 'User', 
                            attributes: ['username', 'profileImage'],
                        }
                    ]
                },
                {
                    model: User,
                    as: 'User',
                    attributes: ['username', 'profileImage'],
                }
            ],
        });
        return post;
    }catch(err){
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}

export async function getPostsOfUser(id){
    try {
        const posts = await Posts.findAll({
            where: { userId : id}
        });

        return posts
    } catch (err) {
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}

export async function getFeed(id){
    try {
        const posts = await User.findAll({
            where: { id : id},
            include: [
                {
                    model: User,
                    attributes: ['username', 'profileImage'],
                    as: 'Following',
                    include: [
                        {
                            model: Posts,
                            as: 'Posts'
                        }
                    ]

                }
            ],
            attributes: ['username', 'profileImage'],
        });

        return posts
    } catch (err) {
        throw new Error(err.status ?? 500, err.message ?? "Internal error");
    }
}