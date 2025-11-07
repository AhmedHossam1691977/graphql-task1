import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    major: {
        type: String,
        required: false
    },
    courses: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }],
        required: true,
        default: []
    }
});

export const  StudentModel = mongoose.model('Student', studentSchema);

