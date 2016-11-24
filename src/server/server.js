// Packages
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const path = require('path');
// Modules
const pairing = require('./helpers/pairing')
const apiRouter = require('./routes/api.js');
// Env variables
const app = express();
const port = 3000;

const AuthenticationController = require('./controllers/auth'),  
      passportService = require('../../config/passport'),
      passport = require('passport');
const protectedRoutes = require('./routes/protectedRoutes');

// ---------- MIDDLEWARE ----------
// REQUEST LOGGING
app.use(morgan('dev'));

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false }); 

// Constants for role types
const REQUIRE_ADMIN = "Admin",  
      REQUIRE_OWNER = "Owner",
      REQUIRE_CLIENT = "Client",
      REQUIRE_MEMBER = "Member"; 

// SERVE STATIC ASSETS
app.use(express.static('src/client'));

// BODY PARSING
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// --------------------------------

// ------------ ROUTES ------------
app.use('/api', apiRouter);
app.use('/protected', protectedRoutes);
// --------------------------------

  //=========================
  // Auth Routes
  //=========================
  authRoutes = express.Router();

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRouter.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);


app.get('/*', function (request, response){
  console.log('catch all');
  response.sendFile(path.resolve('src/client', 'index.html'));
});


// SERVER
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

// SOCKET CONNECTION
const io = require('socket.io')(server);
pairing.setPairingListeners(io)

module.exports = app;
