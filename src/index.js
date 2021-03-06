/* Backend API Loadup Script */

const express = require('express');

const apiRouter = require('./routers/apiRouter');
const viewRouter = require('./routers/viewRouter');

const app = express();
const port = 3001;

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.set('views', './dist/views');
app.set('view engine', 'pug');

app.use('/', viewRouter);
app.use('/api', apiRouter);

app.listen(port);

let parseJSONTable = (data) => {

}

//console.log(kelloton._jsonData);
