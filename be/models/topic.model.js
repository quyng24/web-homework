import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    topicName: String,
    imgTopic: String,
    descriptionTopic: String,
    duration: { type: Number, default: 5}
}, {timestamps: true});

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;