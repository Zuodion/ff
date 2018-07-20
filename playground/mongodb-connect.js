// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');//по сути оно одинаковое сверху, потому что можно таким способом вытягивать свойство объекта наружу

MongoClient.connect("mongodb://localhost:27017/TodoApp",{ useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Cannot to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({//insertOne - вставляет новый документ
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Cannot to connect to todo', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));//ops содержит все документы
    // });

//     db.collection("Users").insertOne({
//         name: 'Zuodion',
//         age: 20,
//         location: 'Lviv'
//     }, (err, result) => {
//         if (err) {
//             return console.log('Unable to connect to todo');
//         }
//         console.log(result.ops[0]._id.getTimestamp());
//     });

    client.close();//конец
});