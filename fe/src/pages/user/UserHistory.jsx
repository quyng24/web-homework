import { useNavigate } from 'react-router-dom';
import LayoutDefault from '../../layouts/LayoutDefault';
import { useEffect, useState } from 'react';
import { getResultByUser } from '../../api/apiResult';
import { Table, Button } from 'antd';
import { authProvider } from '../../context/auth';
const { Column } = Table;
export default function UserHistory() {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    const filteredHistory = history.filter(item => item.topicId !== null);
    const fetchHistory = async () => {
        try {
            const user = authProvider.user;
            const res = await getResultByUser(user._id);
            setHistory(res.data);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {fetchHistory();}, []);
  return (
    <div>
        <Table dataSource={filteredHistory} rowKey="_id">
            <Column title="Chủ đề" dataIndex={['topicId', 'topicName']} />
            <Column title="Số câu" dataIndex="totalQuestions" />
            <Column title="Đúng" dataIndex="correctAnswers" />
            <Column title="% Chính xác" dataIndex="percentage" />
            <Column title="Thời gian làm" dataIndex="actualDuration" render={(ac) => ac}/>
            <Column
                title="Xem chi tiết"
                render={(text, record) => (
                    <Button onClick={() => navigate(`/user/result-detail/${record._id}`)} >Chi tiết</Button>
                )}
            />
        </Table>
    </div>
  )
}
