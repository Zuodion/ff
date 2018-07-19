// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');//по сути оно одинаковое сверху, потому что можно таким способом вытягивать свойство объекта наружу

MongoClient.connect("mongodb://localhost:27017/TodoApp",{ useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Cannot to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({_id: new ObjectID('5b504531beea411aeb99e85a')}).toArray().then((docs) => {//ищет по определенному параметру(является промисом)
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 3));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {//ищет по определенному параметру(является промисом)
    //     console.log(`Todos count: ${count}`);//колличество
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Zuodion'}).toArray().then((docs) => {//ищет по определенному параметру(является промисом)
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 3));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });


    //client.close();
});