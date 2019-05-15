const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require('cookie-session');
const keys = require('./config/keys.js');


require('./models/User.js');
require('./config/passport.js');

const users = require("./routes/api/users");
const offers = require("./routes/api/offers");

const app = express();
const path = require('path')

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI || db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys:['fdfvfgnhrfb']
}));
// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/offers", offers);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('front-mern-stage-wars/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front-mern-stage-wars', 'build', 'index.html'))
    });
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));