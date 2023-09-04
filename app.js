// external module
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// internal module
const {notFoundHandler, errorHandler} = require('./middlewares/common/errorHandlers')
const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/inboxRouter');

const app = express();

dotenv.config();

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log('database connection estabilish'))
    .catch((err)=> console.log('database connection error',err));


// request parsar 
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// view engin setup
app.set("view engine", "ejs");

// set static folder 
app.use(express.static(path.join(__dirname,"public")));

// set cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use('/',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);

// error handling
// 404 not found
app.use(notFoundHandler);

// default error handling
app.use(errorHandler);
app.listen(process.env.PORT, ()=>{
    console.log('server is running at port: ',process.env.PORT)
})