import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/connection.js";

import Admin from "./models/Admin.js";
import Student from "./models/Student.js";
import Book from "./models/Book.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

const getAllBooks = async() => {
    let books = await Book.find({});
    return books;
}

app.get('/', async (req, res) => {
    let newBook = new Book({
        name: "Data Structures",
        author: "Heera", 
        category: "Programming",
        bookId: 1001
    });
    // newBook = await newBook.save();  
     
    res.json({ success: true, msg: "Reply from server" });
});

app.post('/login', async (req, res) => {
    
    console.log(req.body);
    const type = req.body.type; 
    if(type === 'student') {
        const enrollno = req.body.enrollno;
        const password = req.body.password;

        const user = await Student.findOne({enrollno: enrollno, password: password}).select("-password");
        res.json({ success: true, msg: "found one user", user: user });
    }

    else if (type === 'admin') { 
        const email = req.body.email;
        const password = req.body.password;
        const admin = await Admin.findOne({email: email, password: password}).select("-password");
        if(admin) {
            let books = await getAllBooks();
            console.log(books);
            res.json({ success: true, msg: "found one user", user: admin , books: books});
        }  
        else {
            res.json({ success: true, msg: "Admin not found"});
        }
    }
    else {
        res.json({ success: true, msg: "user type not specified" });
    }
});

app.post('/register', async (req, res) => {
    const admin = req.body;

    if ((req.body)) {
        const name = admin.name;
        const email = admin.email;
        const password = admin.password;

        console.log(admin);
          
        if (name === undefined || email === undefined || password === undefined) {
            res.json({ success: false, msg: "error occurred, may be some fields are missing, or db error" });
        }

        await Admin.insertMany({ name: name, email: email, password: password }).then((success) => {
            res.json({success: true, msg: success})
        })
        .catch((err) => {
            res.json({success: false, msg: err});
        }) 
    } else {
        res.json({success: false, msg: "body missing"});
    }
});

app.listen(8000, () => {
    console.log('server has been started on port 8000');
    connectDB();
});
