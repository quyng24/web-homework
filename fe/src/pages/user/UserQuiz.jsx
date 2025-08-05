import { getQuestionsByTopicId } from '../../api/apiQuestion'
import { Typography, List, Radio, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { submitResultApi } from '../../api/apiResult';
import LayoutDefault from '../../layouts/LayoutDefault';
const { Title, Text } = Typography;

const UserQuiz = () => {
    const {topicId} = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState({});

    const handleSelect = (questionId, value) => setAnswer(pre => ({...pre, [questionId]: value}));
    const handleSubmit = async () => {
        let correct = 0;
        const answerQuestion = question.map((q) => {
            const userAnswer = answer[q._id];
            const isCorrect = userAnswer === q.answer;
            if (isCorrect) correct++;
            return { ...q, userAnswer, isCorrect };
        });
        try {
            await submitResultApi({
                topicId,
                totalQuestions: question.length,
                correctAnswers: correct,
                percentage: ((correct / question.length) * 100).toFixed(0),
                answers: answerQuestion.map((q) => ({
                    questionId: q._id,
                    selectedAnswer: q.userAnswer || null,
                    isCorrect: q.isCorrect,
                })),
            });
            navigate(`/user/result/${topicId}`);
        } catch (error) {
            console.error("Lỗi gửi kết quả:", error);
        }
    };

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const res = await getQuestionsByTopicId(topicId);
                setQuestion(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchQuestion();
    }, [topicId]);
    return (
        <LayoutDefault>
            <div className="p-6">
                <div className="flex justify-between items-center">
                    <Title level={3}>📝 Làm bài</Title>
                    <Text type="secondary">Số lượng câu: {question.length}</Text>
                </div>
                <List
                    itemLayout="vertical"
                    dataSource={question}
                    renderItem={(q, index) => (
                        <List.Item key={q._id}>
                            <div>
                                <Text strong>{index + 1}. {q.questionText}</Text>
                                <br />
                                <Radio.Group
                                    onChange={e => handleSelect(q._id, e.target.value)}
                                    value={answer[q._id]}
                                    className='mt-2'
                                >
                                    {q.options.map((opt, idx) => (
                                        <Radio key={idx} value={opt} style={{display: 'block'}} className='mt-1 text-gray-700'>{opt}</Radio>
                                    ))}
                                </Radio.Group>
                            </div>
                        </List.Item>
                    )}
                />
                <Button onClick={handleSubmit} >Nộp bài</Button>
            </div>
        </LayoutDefault>
    )
}
export default UserQuiz;