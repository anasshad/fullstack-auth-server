const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//IMPORT Mongoose and connect to Mongodb
mongoose.connect('mongodb://admin:admin1234@ds137483.mlab.com:37483/fullstack_app', { useNewUrlParser: true });

//Initialize app
const app = express();

//HTTP Request Logger Middleware
const morgan = require('morgan');
app.use(morgan('tiny'));

//Enable CORS
const cors = require('cors');
const corsOptions = {
    credentials: true
}
app.use(cors(corsOptions));

//Initializing Passport
require('./auth');
app.use(passport.initialize());


//Configure port
const port = process.env.PORT || 8000;

//IMPORT and use ROUTES
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');

//Using the passport
app.use(indexRoute);
app.use(profileRoute);
app.use(authRoute);


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})
