import {User} from "./user.js";
import {Posts} from "./posts.js";
import {Images} from "./images.js";

User.hasMany(Posts);
Posts.belongsTo(User);

User.belongsToMany(User, {
    through: 'Follows',
    as: 'Followers',
    foreignKey: 'followedUserId',
    otherKey: 'followingUserId',
});
  
User.belongsToMany(User, {
    through: 'Follows',
    as: 'Following',
    foreignKey: 'followingUserId',
    otherKey: 'followedUserId',
});



Posts.hasMany(Images);
Images.belongsTo(Posts);

Posts.belongsToMany(Posts, {
    through: 'Comments',
    as: 'commentingPosts', // Les posts qui commentent
    foreignKey: 'commentingPostId',
    otherKey: 'commentedPostId',
});

Posts.belongsToMany(Posts, {
    through: 'Comments',
    as: 'commentedPosts', // Les posts qui sont commentés
    foreignKey: 'commentedPostId',
    otherKey: 'commentingPostId',
});




export {User, Posts,  Images};