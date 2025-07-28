import Result from "../models/result.model.js";

export const submitResult = async (req, res) => {
    try {
        const { userId, topicId, totalQuestions, correctAnswers, percentage, answers } = req.body;
        const newResult = await Result.create({userId, topicId, totalQuestions, correctAnswers, percentage, answers});
        res.status(201).json(newResult);
    } catch (err) {
        console.error("Error saving result:", err);
        res.status(500).json({ message: "Lỗi khi lưu kết quả." });
    }
}

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