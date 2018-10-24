const express = require('express');
const mongoose = require('mongoose');
// const session = require('express-session');
const passport = require('passport');

//IMPORT Mongoose and connect to Mongodb
mongoose.connect('mongodb://admin:admin1234@ds137483.mlab.com:37483/fullstack_app', { useNewUrlParser: true });

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

// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

require('./auth');
app.use(passport.initialize());
// app.use(passport.session());

//Configure port
const port = process.env.PORT || 8000;

//IMPORT and use ROUTES
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');

app.use(indexRoute);
app.use(profileRoute);
app.use(authRoute);


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})
