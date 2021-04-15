const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create User model
class User extends Model {
    // run on instance data (per user) to check password 
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

User.init(
  {
    id: {
        // use Sequelize DataTypes object to provide what type of data it is 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    // define a password column 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
// validates the length attribute rule set in this model definition
// The promise fulfills if and only if validation is successful
        validate: {
            // password must be >=8 characters long
            len: [8]
        }
    }
  },
  {
// Hooks are also known as callbacks or lifecycle events
// These are functions called before and after calls in sequelize are executed
    hooks: {
// arguments to hooks are passed by reference
// add a default hook to all User models
        async beforeCreate(newUserData) {
// hook function returns a promise
// await makes our function wait then return a Promise which resolves immediately
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
            
        },
// always set a value on a model before saving it
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    // pass in our imported sequelize connection instance (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // disable the modification of table names; 
    // By default, sequelize will automatically transform all passed model names (first parameter of define) into plural
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    // Will automatically set field option for all attributes to snake cased name
    // Does not override attribute with field option already defined
    underscored: true,
    // make it so our model name stays lowercase in the database
    // The name of the model. The model will be stored in `sequelize.models` under this name
    // controls name of auto-generated foreignKey and association naming
    modelName: 'user'
  }
);

// modules allow us to break down complexity in our applications into small chunks
// this tells Node.js which bits of code (functions, strings, etc.) to "export" from a given file so other files are allowed to access the exported code
module.exports = User;

// we can see what our module exports here
// console.log(module);