import {  DataTypes, Model } from 'sequelize';
import { sequelize } from "../data/index.js";


export class Messages extends Model {};

Messages.init(
    {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
        sequelize,
        include: ['channels','user'],
        modelName: 'Messages',
        timestamps: true
    },
);

console.log(Messages === sequelize.models.Messages); // true