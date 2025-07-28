import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    },
    questionText: String,
    options: [{ type: String, required: true }],
    answer: { type: Number, required: true },
});

const Question = mongoose.model('Question', questionSchema);

export default Question;