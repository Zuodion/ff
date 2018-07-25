require('./config/config.js');

let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');
let _ = require('lodash');
let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate1.js');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

//Всё это работае вот так:есть 2 конструктор: todo и user. Работают
//они на mongoose выше идет пост - создание странички по сути. далее
//создается объект на основе Todo с параметром text. который берется из postman
//(bodyParserom вытягивается текст) далее сохраняется в базу данных

app.get('/todos', (req, res) => {//получить все документы в todos и озаглавить и замутить массив с объектами:
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});



app.get('/todos/:id', (req, res) => {
    let id = req.params.id; //id берется из того, куда мы заходим в postman

    if (!ObjectID.isValid(id)) {//id берется из того, куда мы заходим в postman
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {//удаляет документ с id, который посылается по delete запросу
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => { //кароче это все обновляет свойства объекта
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);// по параметрам которые берутся с модели
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();//если completed true о пишет во сколько милисекунд это было сделано
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);// по параметрам которые берутся с модели
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);//кароче идет в аутентификациу, смотрит и ищет по токену который рекваирится и отсылает назад юзера
});

app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);// по параметрам которые берутся с модели
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })
    }).catch((e) => {
        res.status(400).send();
    })
});

app.delete('/users/me/token', authenticate, (req, res) => {//удаляет нужный токен
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};


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

