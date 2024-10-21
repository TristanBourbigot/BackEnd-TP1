import {  DataTypes, Model } from 'sequelize';
import { sequelize } from "../data/index.js";


export class User extends Model {};

User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
      },
      country: {
        type: DataTypes.ENUM,
        values: ['FR', 'EN'],
      },
      profileImage: {
        type: DataTypes.STRING,
        defaultValue: "./images/no-user-profil-image.jpg",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    },
  );

console.log(User === sequelize.models.User); // true