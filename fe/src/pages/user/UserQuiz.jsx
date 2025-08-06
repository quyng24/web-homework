import { getQuestionsByTopicId } from '../../api/apiQuestion'
import { Typography, List, Radio, Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { submitResultApi } from '../../api/apiResult';
import LayoutDefault from '../../layouts/LayoutDefault';
import { formatTime } from '../../utils/date';
import { getTopicById } from '../../api/apiTopic';
const { Title, Text } = Typography;

const UserQuiz = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState({});
    const [allowedDuration, setAllowedDuration] = useState(null)
    const [timeLeft, setTimeLeft] = useState(null);
    const [startTime, setStartTime] = useState(() => {
        const saved = localStorage.getItem(`quizStartTime-${topicId}`);
        return saved ? parseInt(saved) : null;
    });

    const timerRef = useRef(null);
    
    const fetchQuestion = async () => {
        try {
            const [questionRes, topicRes] = await Promise.all([getQuestionsByTopicId(topicId), getTopicById(topicId)]);
            setQuestion(questionRes.data);
            setAllowedDuration(topicRes.data.duration)
        } catch (error) {
            console.error(error);
        }
    }
    const handleSelect = (questionId, value) => {
        setAnswer((prev) => {
            const newAnswers = { ...prev, [questionId]: value };
            if (!startTime) {
                const now = Date.now();
                setStartTime(now);
                localStorage.setItem(`quizStartTime-${topicId}`, now.toString());
            }
            return newAnswers;
        });
    };
    const handleSubmit = async () => {
        const hasAnswer = Object.keys(answer).length > 0;
        if (!hasAnswer) {
            localStorage.removeItem(`quizStartTime-${topicId}`);
            navigate("/user/topic");
            return;
        }
        const answerQuestion = question.map((q) => ({
            questionId: q._id,
            selectedAnswer: answer[q._id] || null,
        }));

        try {
            await submitResultApi({
                topicId,
                answers: answerQuestion,
                startTime,
                endTime: Date.now()
            });
            localStorage.removeItem(`quizStartTime-${topicId}`);
            navigate(`/user/result/${topicId}`);
        } catch (error) {
            console.error("Lỗi gửi kết quả:", error);
        }
    };
    useEffect(() => {
        if (!startTime || !allowedDuration) return;

        const endTime = startTime + allowedDuration * 60 * 1000;

        const updateTimer = () => {
            const now = Date.now();
            const remaining = Math.floor((endTime - now) / 1000);
            if (remaining <= 0) {
                clearInterval(timerRef.current);
                handleSubmit(); 
            } else {
                setTimeLeft(remaining);
            }
        };

        updateTimer();
        timerRef.current = setInterval(updateTimer, 1000);
        return () => clearInterval(timerRef.current);
    }, [startTime, allowedDuration]);
    useEffect(() => {fetchQuestion();}, [topicId]);
    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <Title level={3}>📝 Làm bài</Title>
                <p className="text-red-600 text-lg font-semibold">⏱️ Thời gian còn lại: {formatTime(timeLeft)}</p>
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
    )
}
export default UserQuiz;