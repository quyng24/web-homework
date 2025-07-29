import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { getTopics } from "../../api/apiTopic";
import LayoutDefault from "../../layouts/LayoutDefault";
import { useNavigate } from "react-router-dom";
const UserTopic = () => {
  const [topic, setTopic] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataTopics = async () => {
      const res = await getTopics();
      setTopic(res.data);
      console.log(res.data)
    }
    fetchDataTopics();
  }, []);

  const columns = [
    {
      title: "Tên chủ đề",
      dataIndex: "topicName",
      key: "topicName",
      render: (index) => index
    },
    {
      title: "Số câu hỏi",
      dataIndex: "questionCount",
      key: "questionCount",
    },
    {
      title: "Làm bài",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => navigate(`/user/quiz/${record._id}`)}>Làm bài</Button>
      ),
    },
  ];

  return (
    <LayoutDefault>
      <div>
        <h2>Danh sách chủ đề</h2>
        <Table
          columns={columns}
          dataSource={topic}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </LayoutDefault>
  );
};

export default UserTopic;
