import {  DataTypes, Model } from 'sequelize';
import { sequelize } from "../data/index.js";


export class Images extends Model {};

Images.init(
    {
        path: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
        sequelize,
        modelName: 'Images',
        timestamps: true,
        updatedAt: false
    },
);

console.log(Images === sequelize.models.Images); // true