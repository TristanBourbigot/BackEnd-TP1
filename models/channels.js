import {  DataTypes, Model } from 'sequelize';
import { sequelize } from "../data/index.js";


export class Channels extends Model {};

Channels.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
        sequelize,
        modelName: 'Channels',
        timestamps: true
    },
);

console.log(Channels === sequelize.models.Channels); // true