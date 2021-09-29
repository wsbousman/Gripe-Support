const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SECRET,
    cookie: {
        // timeouts after an hour
        maxAge: 1000*60*60
    },
    resave: false,
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const routes = require("./controllers");

app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now live on ${PORT}! d(^~^)b`));
});