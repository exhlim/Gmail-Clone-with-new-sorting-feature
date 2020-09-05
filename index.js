const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const app = express();
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const reactEngine = require('express-react-views').createEngine();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);


const allModels = require('./db');

const setRoutesFunction = require('./routes');

setRoutesFunction(app, allModels);


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));
let onClose = function(){
  server.close(() => {
    console.log('Process terminated')
    allModels.pool.end( () => console.log('Shut down db connection pool'));
  })
};