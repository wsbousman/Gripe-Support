const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {

    async checkPassword(loginPw) {
        const match = await bcrypt.compare(loginPw, this.password);
        return match;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1]
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // add special chacarter and length validation?
            len: [1]
        }
    },

    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
},
    {
        hooks: {
            // Setup hook to hash password prior to storing it in the DB
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // Setup hook to has password prior to storing it in the DB on a PUT request, this means that PUT requests to the server will need the current password to be passed along in the req.body
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10); 
                return updatedUserData; 
            }
        },
        sequelize,
        timestamps: false, 
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User; 