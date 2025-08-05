import Result from "../models/result.model.js";
import Question from "../models/question.mode.js";

export const submitResult = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topicId, answers, startTime, endTime } = req.body;
    if (!topicId || !answers || !Array.isArray(answers)) return res.status(400).json({ message: "Dữ liệu không hợp lệ." });
    const questions = await Question.find({ topicId });
    let correct = 0;
    const evaluatedAnswers = answers.map(a => {
      const original = questions.find(q => q._id.toString() === a.questionId);
      const isCorrect = original && original.answer === a.selectedAnswer;
      if (isCorrect) correct++;
      return {
        questionId: a.questionId,
        selectedAnswer: a.selectedAnswer,
        isCorrect
      };
    });
    const totalQuestions = questions.length;
    const percentage = ((correct / totalQuestions) * 100).toFixed(0);

    // Tính thời gian làm bài
    const durationInMs = new Date(endTime) - new Date(startTime);
    const minutes = Math.floor(durationInMs / 60000);
    const seconds = Math.floor((durationInMs % 60000) / 1000);
    const formattedDuration = `${minutes}:${seconds}`;

    const newResult = new Result({
      userId,
      topicId,
      totalQuestions,
      correctAnswers: correct,
      percentage,
      answers: evaluatedAnswers,
      startTime,
      endTime,
      duration: formattedDuration
    });

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
    const results = await Result.find({ userId }).populate("topicId", "topicName").sort({ createdAt: -1 });
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
    .populate("topicId", "topicName")
    .populate("answers.questionId", "questionText options answer");
    if(!result) return res.status(404).json({message: "Không tìm thấy kết quả"});
    res.json(result);
  } catch (error) {
    console.error("Lỗi khi lấy kết quả:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
}

export const getUserResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId).populate("topicId", "topicName").populate("answers.questionId");
    if(!result) return res.status(404).json({ message: "Không tìm thấy kết quả" });
    res.json(result);
  } catch (error) {
    console.error("Lỗi khi lấy kết quả:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
}