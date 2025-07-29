import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import LayoutDefault from '../../layouts/LayoutDefault';
import { useEffect, useState } from 'react';
import { getResultByUser } from '../../api/apiResult';
import { Table } from 'antd';
import BaseButton from '../../components/common/BaseButton';
const { Column } = Table;
export default function UserHistory() {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const res = await getResultByUser(user.id);
                setHistory(res.data);
                console.log(res.data)
            } catch (error) {
                console.error(error)
            }
            }
            fetchHistory();
    }, []);
  return (
    <LayoutDefault>
        <div>
            <Table dataSource={history} rowKey="_id">
                <Column title="Chủ đề" dataIndex={['topicId', 'topicName']} />
                <Column title="Số câu" dataIndex="totalQuestions" />
                <Column title="Đúng" dataIndex="correctAnswers" />
                <Column title="% Chính xác" dataIndex="percentage" />
                <Column title="Ngày làm" render={(text, record) => moment(record.createdAt).format('DD/MM/YYYY HH:mm')} />
                <Column
                    title="Xem chi tiết"
                    render={(text, record) => (
                    <BaseButton onClick={() => navigate(`/user/result-detail/${record._id}`)} label="Chi tiết" />
                    )}
                />
            </Table>
        </div>
    </LayoutDefault>
  )
}
