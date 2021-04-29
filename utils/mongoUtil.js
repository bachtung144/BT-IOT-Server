// require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://root:1234@listdevice.1azs4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "BT_IOT";
let _db;

module.exports = {
    connectToServer: function( callback ) {
        MongoClient.connect( url, function( err, client ) {
            _db  = client.db(dbName);
            return callback( err );
        });
    },

    getDb: function() {
        return _db;
    },

    close: function() {
        _db.close();
    }
};
