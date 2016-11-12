const morgan = require('morgan');
const bodyParser = require('body-parser');


module.exports = (app, express) => {
  //Print all of the requests to the server
  app.use(morgan('dev'));

  //Reads information from forms ands puts it in a body object
  app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
    extended: true
  }));

};
