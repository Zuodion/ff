// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');//по сути оно одинаковое сверху, потому что можно таким способом вытягивать свойство объекта наружу
const nameOfCollection = 'Users';

MongoClient.connect("mongodb://localhost:27017/TodoApp",{ useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Cannot to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection(nameOfCollection).findOneAndUpdate({
        _id : ObjectId("5b503d0432dead1bd4a02cdc")
    }, {
        $set: {//для обновления необходимо использовать $set
            name: 'Lolka'
    },
        $inc: {
            age: 3//увеличевает параметр age на 3
        }
    }, {
        returnOriginal: false//return original возвращает НЕобновленный документ(по умолчанию true)
    }).then((result) => {
        console.log(result);
    });
    //findOneAndUpdate(filter, update, options, callback/promise)

    //client.close();
});