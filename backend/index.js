const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const authRouter = require('./api/auth');
const adminRouter = require('./api/admin');

const chatServer = require('./chat');

const PORT = 8000;
const db = "mongodb://localhost:27017/mvp";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/auth", authRouter);
app.use("/admin", adminRouter);

mongoose.connect(db).then(() => {
    console.log("MongoDB is connected.");
}).catch(err => {
    console.log(err);
})

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Server is running at ${PORT}`);
})

chatServer.listen(3000, () => console.log("Socket.IO is running at 3000"));