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
    totalQuestions: Number,
    correctAnswers: Number,
    percentage: Number,
    answers: [
        {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        selectedAnswer: String,
        isCorrect: Boolean,
        },
    ],
    createdAt: {type: Date, default: Date.now}
});
const Result = mongoose.model('Result', resultSchema);
export default Result;