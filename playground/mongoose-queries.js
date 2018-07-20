const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

User.findById('5b506b0c76769027e4b6b15a').then((user) => {
    if(!user) {
        return console.log('User not found');
    }
    console.log(JSON.stringify(user, undefined, 3));

}, () => {
    console.log('Invalid Id');
});

// let id = '5b51b3145913a633bcf724571';
//
// if (!ObjectID.isValid(id)) {
//     console.log ('ID not valid');
// }
// Todo.find({
//     _id: id
// }).then ((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then ((todo) => {
//     console.log('Todo', todo);
// });
// Todo.findById(id).then ((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id', todo);
// }).catch((e) => {
//     console.log(e);
// });