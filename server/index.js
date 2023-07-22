import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/connection.js";
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

app.get('/', (req, res)=>{
    res.json({success: true, msg: "Reply from server"});
});

app.post('/login', async (req, res)=>{
    console.log(req.body);

    req.json({success: true, msg: "user login succcess"});
})

app.post('/register', async (req, res)=> {
    console.log(req.body);

    res.json({success: true, msg: "user registration successfull"});
})

app.listen(8000, ()=> {
    console.log('server has been started on port 8000');
    connectDB();
})