require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require("method-override");
const connectDB = require("./server/config/db");
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');



const app = express();
const port = 5000 || process.env.PORT;


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  // Date.now() - 30 * 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));


connectDB();

// Static Files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
// app.set('layout', './notes/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/notes'));


// app.get('/', function(req, res) {
//     const locals = {
//         title : "Note App",
//         description : "NodeJS Note App"
//     }
//     res.render("index",locals);
//   })
  
  
  app.listen(port, () => {
    console.log(`App listening on port ( http://localhost:${port} )` );
  });
  
