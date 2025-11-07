import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    students: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }],
        default: [],
        required: true
    }
}, {
    timestamps: true
});

export const  CourseModel = mongoose.model('Course', courseSchema);

