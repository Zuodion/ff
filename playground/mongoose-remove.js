const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove().then((result) => {
//     console.log(result);
// }); //Все удаляет

// Todo.findOneAndRemove();
// Todo.findByIdAndRemove();

Todo.findByIdAndRemove("5b52ee63beea411aeb9a0a2e").then((todo)=>{
    console.log(todo);
});