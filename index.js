const express   = require('express');
const bodyParser= require('body-parser');
const env       = require('./env.json');
const cors      = require('cors');
const mongoose = require('mongoose')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(require('./routes'));
app.disable('etag');

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // dbName: "BT_IOT"
}

mongoose.connect(env.MONGODB,connectionParams)
    .then( (db) => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.listen(env.PORT || 5000, function(){
    console.log('now listening port:' + env.PORT);
});
