import express from "express";
import { APP_PORT,DB_URL } from "./Config";
import errorHandling from "./middleware/errorHanlder";
import router from "./routes";
const Mongoose=require('mongoose');
const app=express();

Mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db=Mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('Db Connected');
})


app.use(express.json());//To underts
app.use('/api',router);

//Error Handling miidleare
app.use(errorHandling);
app.listen(APP_PORT,()=>{
    console.log('server intailized', APP_PORT)
})

