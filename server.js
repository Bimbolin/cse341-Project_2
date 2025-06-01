const express = require('express');
const bodyParser = require('body-parser');

const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json())
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

 app.use('/', require('./routes/index.js'));

 
 mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
}
});