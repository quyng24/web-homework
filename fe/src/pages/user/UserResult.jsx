import { useParams } from "react-router-dom";
import { Typography, List, Radio, Button, Tag } from "antd";
import { useEffect, useState } from "react";
import { getLatestResultByUserAndTopic } from "../../api/apiResult";
const { Title, Text } = Typography;
import LayoutDefault from '../../layouts/LayoutDefault';
import { authProvider } from "../../context/auth";

const UserResult = () => {
  const { topicId } = useParams();
  const user = authProvider.user;
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getLatestResultByUserAndTopic(user._id, topicId);
        setResult(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchResult();
  }, [topicId, user._id]);

  return (
    <>
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
                            color: selectedAnswer === null ? "#888" : isRightAnswer ? "green" : isUserWrong ? "red" : "#888",
                            fontWeight: selectedAnswer !== null && (isRightAnswer || isUserWrong) ? 600 : 400,
                          }}
                        >
                          {opt}{" "}
                          {(isRightAnswer && selectedAnswer !== null) && <Tag color="green">Đúng</Tag>}
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
    </>
  );
};

export default UserResult;
