// path is a node module used for handling and transforming file paths.
const path = require('path');
// express web app framework let's us structure and handle numerous http requests at specific urls.
const express = require('express');
// let's us keep user data to provide a unique experience
// sessions store user data when accessing and browsing our app
// express-session saves and retrieves data using a cookie
// maps sessionId as a primary key in a database
const session = require('express-session');
// creates a Handlebars view engine for express
const exphbs = require('express-handlebars');
// imports the routes we created with express
const routes = require('./controllers');
// imports our authentication and format_date helpers
const helpers = require('./utils/helpers');
// imports out connection to sequelize either from Heroku/JawsDB or localhost/TablePLUS
const sequelize = require('./config/connection');
// this class will be used to create an instance for a SQL session store using sequelize
// this particular syntax is specific to when using express as well
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine instance with custom helpers
const hbs = exphbs.create({ helpers });



// 
const sess = {
    // required to sign the session ID cookie
    secret: 'Mary goes robblin with marigold goblins',
    // specifies number (ms) to use when calculating Expires Set-Cookie attribute
    // this is the session ID cookie
    cookie: { maxAge: null },
    // false is typically recommended; see: touch method
    resave: false,
    // forces a session to be saved to the store
    // false may be preferred here for implementing login sessions; see docs
    saveUninitialized: true,
    // the session store instance, defaults to a new MemoryStore instance
    // note: default server-side session storage is purposely not designed for a production environment
    // it will leak memory under most conditions
    store: new SequelizeStore({
        // connect the Sequelize instance with express and sessions
        db: sequelize
    })
};

// creates a middleware for our session object
// this will also have access to the route events the user triggers
app.use(session(sess));




// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}!`));
});