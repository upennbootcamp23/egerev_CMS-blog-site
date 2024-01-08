const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model 
{
    checkPassword(password) {
        return bcrypt.compareSync(password,this.password);
    }
}

User.init(
    {
        id: 
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: 
        {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: 
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: 
            {
                len: [4]
            }
        }
    },
    {
        hooks:
        {
            async beforeCreate(newUser)
            {
                newUser.password = await bcrypt.hash(newUser.password,10);
                return newUser;
            },
            async beforeUpdate(updatedUser)
            {
                updatedUser.password = await bcrypt.hash(updatedUser.password,10);
                return updatedUser;
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