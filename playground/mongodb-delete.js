// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');//по сути оно одинаковое сверху, потому что можно таким способом вытягивать свойство объекта наружу
const nameOfCollection = 'Users';

MongoClient.connect("mongodb://localhost:27017/TodoApp",{ useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Cannot to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // deleteMany
    db.collection(nameOfCollection).deleteMany({name: 'Zuodion'}).then((result)=> {
        console.log(result);
    });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=> {
    //     console.log(result);

    //findOneAndDelete
    db.collection(nameOfCollection).findOneAndDelete({_id: ObjectId('5b504171e5002407d417fd92')}).then ((result)=>{
        console.log(result);
    });



    //client.close();
});