// const { Sequelize, Model, DataTypes } = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Post model
// Models are the essence of Sequelize. A model is an abstraction that represents a table in our database
// In Sequelize, it is a class that extends Model.
// The model tells Sequelize several things about the entity it represents, such as the name of the table in the database and which columns it has (and their data types)
// A model in Sequelize has a name
// This name does not have to be the same name of the table it represents in the db
// Usually, models have singular names (such as User) while tables have pluralized names (such as Users), though this is configurable
class Post extends Model {}

// .init initializes a model, representing a table in the DB, with attributes and options
Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
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