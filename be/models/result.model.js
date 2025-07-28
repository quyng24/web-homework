import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Topic",
        required: true
    },
    totalQuestion: Number,
    correctAnswer: Number,
    percentage: Number,
    answers: [
        {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        selectedAnswer: String,
        isCorrect: Boolean,
        },
    ],
    createAt: {type: Date, default: Date.now}
});
const Result = mongoose.model('Result', resultSchema);
export default Result;