import { Table, Button } from "antd";
import { getTopics } from "../../api/apiTopic";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const UserTopic = () => {
  const navigate = useNavigate();
  const {data: topics} = useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
    select: res => res.data,
  })
  const columns = [
    {title: "Tên chủ đề", dataIndex: "topicName", key: "topicName", render: (index) => index},
    {title: "Số câu hỏi", dataIndex: "questionCount", key: "questionCount"},
    {title: 'Thời gian làm bài', dataIndex: 'duration', key: 'duration'},
    {
      title: "Làm bài",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => navigate(`/user/quiz/${record._id}`)}>Làm bài</Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh sách chủ đề</h2>
      <Table
        columns={columns}
        dataSource={topics}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default UserTopic;
