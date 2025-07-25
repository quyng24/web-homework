import Topic from "../models/topic.model.js";

//GET /
export const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GET /:id
export const getTopicById = async (req, res) => {
    const {id} = req.params;
    if (!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ message: "Invalid ID" });
    try {
        const topic = await Topic.findById(id);
        if (!topic) return res.status(404).json({ message: "Topic not found" });
        res.json(topic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST /
export const createTopic = async (req, res) => {
    try {
        const {topicName, descriptionTopic, imgTopic} = req.body;
        if(!topicName) return res.status(400).json({message: 'Create fail!'});
        const topic = new Topic({ topicName, descriptionTopic, imgTopic });
        await topic.save();
        res.status(201).json(topic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//DELETE /:id
export const deleteTopic = async (req, res) => {
    const { id } = req.params;
    if (!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ message: "Invalid ID" });
    try {
      const result = await Topic.deleteOne({ _id: id });
      res.status(result.deletedCount ? 200 : 404).json({message: result.deletedCount ? "Topic deleted" : "Topic not found",});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

//PUT /:id
export const updateTopic = async (req, res) => {
    const {id} = req.params;
    if(!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({message: "Invalid ID"});
    try {
        const updateData = req.body;
        const updateTopic = await Topic.findByIdAndUpdate(id, updateData, {new: true, runValidators: true});
        if(!updateTopic) return res.status(404).json({message:'User not found'});
        res.json(updateTopic);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}