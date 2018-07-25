const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

bcrypt.genSalt(10, (error, salt) => {//10 - cложность замка, salt - сам замок
    bcrypt.hash(password, salt, (err, hash) => {//используем к паролю замок salt
        console.log(hash);//hash - захешированый пароль
    })
});

// let hashedPassword = '$2a$10$2Eph5H9GY1y6K5kS/Nc2BOGfZ5FeEuv.L2d.4UhrxTYv92e1FYoZy';
//
// bcrypt.compare(password, hashedPassword, (err, result) => {
//     console.log(result);
// });

// let data = {
//     id: 10
// };
//
// let token = jwt.sign(data, '123abc');//второй аргумент это секрет - строка которая по сути множитель хеша
// console.log(token);
//
// let decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);
// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// let data = {
//     id: 4
// };
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// let resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();
//
// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust!')
// }