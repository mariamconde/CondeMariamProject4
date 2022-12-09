//require modules
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const connectionRoutes = require("./routes/connectionRoutes");
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require('./routes/userRoutes');
//create app
const app = express();

//configure app
let port = 3000;
let host = "localhost";
let url = 'mongodb://localhost:27017/NBAD';
app.set("view engine", "ejs");

//connect to MongoDB
mongoose.connect(url)
  .then(() => {
    //start the server
    app.listen(port, host, () => {
      console.log("🚀 Server is running on port", port);
    });
  })
  .catch(err => console.log(err.message));

//mount middleware
app.use(session({
  secret: 'hgskxhksxzhnskjznxs',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 },
  store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/NBAD' })
}));
app.use(flash());

app.use((req, res, next) => {
  console.log(req.session)
  res.locals.successMessages = req.flash('success');
  res.locals.errorMessages = req.flash('error');
  next();
});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
//set up routes
app.use("/connections", connectionRoutes);
app.use('/', mainRoutes);
app.use('/users', userRoutes);
//404 error handler
app.use((req, res, next) => {
  let err = new Error("The server cannot locate " + req.url);
  err.status = 404;
  next(err);
});
//error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Error";
  }
  res.status(err.status);
  res.render("./main/error", { error: err });
});


