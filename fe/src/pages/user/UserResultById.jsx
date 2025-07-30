import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LayoutDefault from "../../layouts/LayoutDefault";
import { getUserResultById } from "../../api/apiResult"; 
import { Typography, List, Radio, Tag, Button } from "antd";
const { Title, Text } = Typography;

const UserResultById = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getUserResultById(resultId);
        setResult(res.data);
        console.log(res.data)
      } catch (err) {
        console.error(err);
      }
    };
    fetchResult();
  }, [resultId]);
  return (
    <LayoutDefault>
        {!result ? <Text type="danger">Không tìm thấy kết quả.</Text> : 
          (
            <div className="p-6">
              <Title level={2} className="text-center">✅ Tổng số câu đúng: {result.correctAnswers}/{result.totalQuestions}</Title>
              <Title level={4} className="text-center">🎯 Phần trăm chính xác: {result.percentage}%</Title>
              <List
                itemLayout="vertical"
                dataSource={result.answers}
                renderItem={({ questionId, selectedAnswer }, index) => (
                  <List.Item key={questionId._id}>
                    <div className="flex flex-col">
                      <Text strong>{index + 1}. {questionId.questionText}</Text>
                      <Radio.Group value={selectedAnswer} disabled className="mt-2">
                        {questionId.options.map((opt, idx) => {
                          const isRightAnswer = opt === questionId.answer;
                          const isUserWrong = opt === selectedAnswer && !isRightAnswer;
    
                          return (
                            <Radio
                              key={idx}
                              value={opt}
                              style={{
                                display: "block",
                                marginTop: 4,
                                color: isRightAnswer
                                  ? "green"
                                  : isUserWrong
                                  ? "red"
                                  : "#888",
                                fontWeight: isRightAnswer || isUserWrong ? 600 : 400,
                              }}
                            >
                              {opt}{" "}
                              {isRightAnswer && <Tag color="green">Đúng</Tag>}
                              {isUserWrong && <Tag color="red">Sai</Tag>}
                            </Radio>
                          );
                        })}
                      </Radio.Group>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          )}
          {result && (
            <Button type="primary" onClick={() => navigate(`/user/quiz/${result.topicId._id || result.topicId}`)} >Làm lại</Button>
          )}
        </LayoutDefault>
  )
};

export default UserResultById;
