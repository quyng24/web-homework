import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Typography, List, Radio, Button, Tag } from "antd";
const { Title, Text } = Typography;

const UserResult = () => {
  const { topicId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.answeredQuestions) {
    return <Text type="danger">Không có dữ liệu kết quả.</Text>;
  }

  const { correct, total, percent, answeredQuestions } = state;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2} className="text-center">
        🎉 Tổng số câu đúng: {correct}/{total}
      </Title>
      <Title level={4} className="text-center mb-8">
        🎯 Phần trăm chính xác: {percent}%
      </Title>

      <List
        itemLayout="vertical"
        dataSource={answeredQuestions}
        renderItem={(q, index) => (
          <List.Item key={q._id}>
            <div>
              <Text strong>
                {index + 1}. {q.questionText}
              </Text>

              <Radio.Group
                value={q.userAnswer}
                disabled
                style={{ marginTop: 8 }}
              >
                {q.options.map((opt, idx) => {
                  const isCorrectAnswer = opt === q.answer;
                  const isUserChosen = opt === q.userAnswer;
                  const isWrong = isUserChosen && !isCorrectAnswer;

                  return (
                    <Radio
                      key={idx}
                      value={opt}
                      className={`block mt-1 text-${isCorrectAnswer ? 'green' : isWrong ? 'red' : '#888'}-400 ${isCorrectAnswer || isWrong ? 'font-semibold' : 'font-normal'}`}
                    >
                      {opt}
                      {" "}
                      {isCorrectAnswer && <Tag color="green">Đúng</Tag>}
                      {isWrong && <Tag color="red">Sai</Tag>}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>
          </List.Item>
        )}
      />

      <div className="text-center mt-8">
        <Button onClick={() => navigate("/user")} className="mr-4">Quay về chủ đề</Button>
        <Button type="primary" onClick={() => navigate(`/user/quiz/${topicId}`)}>Làm lại</Button>
      </div>
    </div>
  );
};

export default UserResult;
