import Result from "../models/result.model.js";
import Topic from "../models/topic.model.js";

export const getTopicStatistics = async (req, res) => {
  try {
    const stats = await Topic.aggregate([
      {$lookup: {from: 'results', localField: '_id', foreignField: 'topicId', as: 'results'}},
      {$project: {_id: 1, topicName: 1, userCount: { $size: '$results' }}}]);
    res.status(200).json(stats);
  } catch (err) {
    console.error("Lỗi thống kê chủ đề:", err);
    res.status(500).json({ message: "Lỗi khi thống kê chủ đề." });
  }
};

