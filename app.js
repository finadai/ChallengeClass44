const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
const port = 9075;
const sessionsRouter = require("./src/routes/sessions.router");
const viewsRouter = require("./src/routes/views.router");
const cartsRouter = require("./src/routes/carts.router");
const mockingRouter = require("./src/routes/mocking.router");
const loggerTestRouter = require("./src/routes/loggerTest.router");
const passport = require('passport');
const dotenv = require('dotenv');
const errorHandler = require('./src/middleware/errorHandler');
const logger = require('./src/utils/logger');
const swaggerDocs = require('./src/swaggerConfig');
const productsRouter = require("./src/routes/products.router");
const usersRouter = require('./src/routes/users.router');
const config = require('./src/config');
const authorize = require('./src/middleware/auth');

dotenv.config();



swaggerDocs(app);

app.use(session({
    secret: 'ourNewSecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: config.dbConnectionString,
        ttl: 3600
    })
}));

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/', viewsRouter);

app.listen(port, () => logger.info(`Server running on port ${port}`));




mongoose.connect(config.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('Success on connection');
    })
    .catch(err => {
        logger.error('Database connection error:', err);
    });

const app = express();

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: config.dbConnectionString,
        ttl: 3600
    })
}));

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);
app.use('/api/carts', authorize('user'), cartsRouter);
app.use('/', mockingRouter);
app.use('/', loggerTestRouter);

app.use(errorHandler);

app.listen(port, () => logger.info(`up and running on port ${port}`));
