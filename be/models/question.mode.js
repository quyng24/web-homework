import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    },
    questionText: String,
    options: [String],
    answer: String,
});

const Question = mongoose.model('Question', questionSchema);

export default Question;