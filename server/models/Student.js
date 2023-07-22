import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    enrollno: {
        type: String,
        unique: true
    },   
    password: {
        min: 4,
        max: 16
    }
});

const Student = mongoose.model('student', studentSchema);

export default Student;