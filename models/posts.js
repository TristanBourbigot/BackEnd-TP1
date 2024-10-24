import {  DataTypes, Model } from 'sequelize';
import { sequelize } from "../data/index.js";


export class Posts extends Model {};

Posts.init(
    {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    },
        {
        sequelize,
        include: ['user'],
        modelName: 'Posts',
        timestamps: true
    },
);

console.log(Posts === sequelize.models.Posts); // true