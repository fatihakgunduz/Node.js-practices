const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

var _db;

const mongoConnect = (cb) => {
    MongoClient.connect(
        '------connection string------')
        .then(client => {
            console.log('Connected');
            _db = client.db();
            cb();
        })
        .catch(err => console.log(err));
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No Database Found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;