const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // minimum length 1, maximum length is 1000
                len: [1,1000]
            }
        },

        flagged: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
            defaultValue: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },

        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        }

    },
    {
        sequelize, 
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post; 