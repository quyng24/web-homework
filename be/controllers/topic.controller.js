import Topic from "../models/topic.model.js";

//GET /
export const getTopics = async (req, res) => {
    try {
        const topicsWithQuestionCount = await Topic.aggregate([
            {
                $lookup: {
                    from: "questions",
                    localField: "_id",
                    foreignField: "topicId",
                    as: "questions"
                }
            },
            { $addFields: {questionCount: { $size: "$questions" }}},
            {$project: {questions: 0}}
        ]);
        res.json(topicsWithQuestionCount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GET /:id
export const getTopicById = async (req, res) => {
    const {id} = req.params;
    if (!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ message: "Invalid ID" });
    try {
        const topic = await Topic.findById(id).sort({createdAt: -1});
        if (!topic) return res.status(404).json({ message: "Không tìm thấy chủ đề" });
        res.json(topic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST /
export const createTopic = async (req, res) => {
    try {
        const {topicName, descriptionTopic, imgTopic} = req.body;
        if(!topicName) return res.status(400).json({message: 'Tạo chủ đề không thành công!'});
        const topic = new Topic({ topicName, descriptionTopic, imgTopic });
        await topic.save();
        res.status(201).json(topic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//DELETE /:id
export const deleteTopic = async (req, res) => {
    try {
        const { id } = req.params;
        if (!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ message: "Invalid ID" });
      const result = await Topic.deleteOne({ _id: id });
      res.status(result.deletedCount ? 200 : 404).json({message: result.deletedCount ? "Đã xoá chủ đề" : "Không tìm thấy chủ đề",});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

//PUT /:id
export const updateTopic = async (req, res) => {
    try {
        const {id} = req.params;
        if(!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({message: "Invalid ID"});
        const updateData = req.body;
        const updateTopic = await Topic.findByIdAndUpdate(id, updateData, {new: true, runValidators: true});
        if(!updateTopic) return res.status(404).json({message:'User not found'});
        res.json(updateTopic);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}