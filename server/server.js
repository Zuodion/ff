const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');
const {ObjectID} = require('mongodb');
const app = express();
const port = procces.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=> {
        res.send(doc);
    }, (e) => {
    res.status(400).send(e);
    });
});
//Всё это работае вот так:есть 2 конструктор: todo и user. Работают
//они на mongoose выше идет пост - создание странички по сути. далее
//создается объект на основе Todo с параметром text. который берется из postman
//(bodyParserom вытягивается текст) далее сохраняется в базу данных

app.get('/todos', (req, res) => { //получить все документы в todos и озаглавить и замутить массив с объектами:
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (e) => {
        res.status(400).send(e)
    })
});

app.get('/todos/:id', (req, res) => {

    let id = req.params.id;//id берется из того, куда мы заходим в postman
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    } Todo.findById(id).then((todo) => {
        if (!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e)
    })
}, () => {

});
app.listen(port, () => {
    console.log(`Started on port ${port}.`)
});

module.exports = {
    app
};


// let Todo = mongoose.model('Todo' , {//конструктор ёпта объекта с 3 свойствами и у каждого можно указать свои требования
//     text: {
//         type: String,
//         required: true,//обязательный существовать
//         minlength: 1,//минимальная длинна
//         trim: true//растояние для того чтобы нормально записать в базу
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });
//
// let otherTodo = new Todo({
//     text: 'Edit this video'//приводит к строке, если это булевый формат или циферки или массив
// });
//
// otherTodo.save().then((doc)=>{//updating to mongoDB
//     console.log (`Saved todo: ${doc}.`)
// },(e) => {
//     console.log('Unable to save todo', e)
// });
// let User = mongoose.model('User', {
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 1
//     }
// });
// let user = new User({
//     email: '  lalka@gmail.com  '
// });
// user.save().then((doc)=>{//updating to mongoDB
//     console.log (`User saved: ${doc}.`)
// },(e) => {
//     console.log('Unable to save user', e)
// });
//
//
// let newTodo = new Todo({
//     text: 'Cook dinner',
//     completed: true,
//     completedAt: +new Date()
// });
//
// newTodo.save().then((doc)=>{//updating to mongoDB
//     console.log (`Saved todo: ${doc}.`)
// },(e) => {
//     console.log('Unable to save todo', e)
// });

