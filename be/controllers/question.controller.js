import mongoose from "mongoose";
import Question from "../models/question.mode.js";

// GET /:id
export const getQuestionsByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(topicId)) return res.status(400).json({ message: "topicId không hợp lệ" });
    const questions = await Question.find({ topicId: new mongoose.Types.ObjectId(topicId) }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy câu hỏi", error: err.message });
  }
};

// POST /
export const createQuestion = async (req, res) => {
  try {
    const { topicId, questionText, options, answer } = req.body;
    if (!mongoose.Types.ObjectId.isValid(topicId)) return res.status(400).json({ message: "topicId không hợp lệ" });
    if (!questionText || !Array.isArray(options) || options.length < 2 || answer === undefined) return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    const question = new Question({ topicId, questionText, options, answer });
    await question.save();
    res.status(201).json({ message: "Tạo câu hỏi thành công", question });
  } catch (err) {
    res.status(500).json({ message: "Lỗi tạo câu hỏi", error: err.message });
  }
};

// PUT /:id
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionText, options, answer } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "ID không hợp lệ" });
    const question = await Question.findByIdAndUpdate(
      id,
      { questionText, options, answer },
      { new: true }
    );

    if (!question) return res.status(404).json({ message: "Không tìm thấy câu hỏi" });
    res.json({ message: "Cập nhật thành công", question });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật", error: err.message });
  }
};

// DELETE /:id
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "ID không hợp lệ" });
    const result = await Question.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "Không tìm thấy câu hỏi để xoá" });
    res.json({ message: "Xoá thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi xoá", error: err.message });
  }
};
