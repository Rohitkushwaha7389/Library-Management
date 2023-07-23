import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: String,
    bookId: {
        type: Number,
        unique: true,
        required: true
    },
    category: String,
    author: String
})

const Book = mongoose.model('book', bookSchema);

export default Book;