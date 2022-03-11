const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

var _db;

const mongoConnect = (cb) => {
    MongoClient.connect(
        'mongodb+srv://Hamenos:Tr5902vLAq5JJnzx@cluster0.4uzwx.mongodb.net/node-js?retryWrites=true&w=majority')
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