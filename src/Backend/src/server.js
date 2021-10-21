const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const connect = require('./config/db');
const studentController = require('./controllers/student.controller');

app.use('/student', studentController);

app.listen('5555', async () => {
    await connect();
    console.log('listening on port 5555');
})

// const express = require('express')
// const cors = require("cors");
// const connect = require("./Config/db")

// const app = express();
// app.use(cors());
// app.use(express.json());

// const studentController = require("./controllers/student.controller")

//   app.use("/students", studentController);

// app.listen(2345, async () => {
//     await connect()
//     console.log('listening to port no 2345');
// })