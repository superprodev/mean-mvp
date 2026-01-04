const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const guestRouter = require('./api/guest');
const adminRouter = require('./api/admin');

const PORT = 8000;
const db = "mongodb://localhost:27017/mvp";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/guest", guestRouter);
app.use("/admin", adminRouter);
app.get("/test", (req, res) => {
    res.send({
        msg: "Hello World!"
    });
})

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
