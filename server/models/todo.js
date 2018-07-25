let mongoose = require('mongoose');

let Todo = mongoose.model('Todo' , {//конструктор ёпта
    text: {
        type: String,
        required: true,//обязательный существовать
        minlength: 1,//минимальная длинна
        trim: true//растояние для того чтобы нормально записать в базу
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

module.exports = {
    Todo
};