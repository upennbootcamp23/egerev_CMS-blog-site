//the files needed
require('dotenv').config();
let express = require('express');
let exphbs = require('express-handlebars');
let path = require('path');
let session = require('express-session');
let SequelizeStore = require('connect-session-sequelize')(session.Store);

let sequelize = require('./config/connection');
let routes = require('./controllers');
let helpers = require('./utils/helpers');

let application = express();

const PORT = process.env.PORT || 3001;

//the middleware needed
application.use(express.json());
application.use(express.urlencoded({extended: true}));
application.use(express.static(path.join(__dirname,'public')));

//the handlebars
let hbs = exphbs.create({});
application.engine('handlebars', exphbs.engine({helpers}));
application.set('view engine', 'handlebars');

//initializing the session
let sess = {
    secret: 'y12',
    rolling: true,
    cookie: {maxAge: 100000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({db: sequelize})
};

//using the session
application.use(session(sess));

//validating the database
sequelize.authenticate().then(() => {
    console.log('Connected to database!');
}).catch((err) => {
    console.error('Failed to connect to database: ', err);
});

//use routes if successful
application.use(routes);

/*syncing sequelize models to the database
After that, we turn on the server */
sequelize.sync({force: false}).then(() => {
    application.listen(PORT, () => {
        console.log(`Server Activated! Now listening on port #${PORT}...`)
    })
});
