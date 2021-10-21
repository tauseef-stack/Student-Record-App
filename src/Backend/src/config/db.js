const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/my-students');
}

module.exports = connect;


// const mongoose = require("mongoose");

// const connect = () => {
//   return mongoose.connect("mongodb://127.0.0.1:27017/School")
// };

// module.exports = connect;