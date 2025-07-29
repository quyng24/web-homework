import Result from "../models/result.model.js";

export const submitResult = async (req, res) => {
  try {
    const { userId, topicId, totalQuestions, correctAnswers, percentage, answers } = req.body;
    const newResult = new Result({userId, topicId, totalQuestions, correctAnswers, percentage, answers});
    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (err) {
    console.error("Lỗi submitResult:", err);
    res.status(500).json({ message: "Lỗi khi lưu kết quả." });
  }
};

export const getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ userId }).populate("topicId", "name").sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ message: "Lỗi khi lấy lịch sử làm bài." });
  }
};

export const getLatestResultByUserAndTopic = async (req, res) => {
  const {userId, topicId} = req.params;
  try {
    const result = await Result.findOne({userId, topicId})
    .sort({createdAt: -1})
    .populate("topicId", "name")
    .populate("answers.questionId", "questionText options answer");
    if(!result) return res.status(404).json({message: "Không tìm thấy kết quả"});
    res.json(result);
  } catch (error) {
    console.error("Lỗi khi lấy kết quả:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
}