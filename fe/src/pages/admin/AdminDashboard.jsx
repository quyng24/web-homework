import { useEffect, useState } from 'react';
import { Table, Tag, Button } from 'antd';
import { deleteUser, getUsers } from '../../api/apiUser';
import { authProvider } from '../../context/auth';
import { getApiChartAdmin } from '../../api/apiAdmin';
import BaseChart from '../../components/BaseChart';


export default function AdminDashboard () {
  const [dataUser, setDataUser] = useState([]);
  const [nameUser, setNameUser] = useState('');
  const [dataStatistics, setDataStatistics] = useState([]);
  const columnsUser = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "geekblue" : "volcano"}>{role}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button disabled onClick={() => handleDeleteUser(record._id)} >Xóa</Button>
      ),
    },
  ];
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      const res = await getUsers();
      setDataUser(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const dataStatisticsRes = await getApiChartAdmin();
        const userRes = await getUsers();
        setDataStatistics(dataStatisticsRes.data);
        setDataUser(userRes.data);
    } catch (err) {
        console.error(err);
      }            
    }
    setNameUser(authProvider.user.name);
    fetchData();
  }, [])
  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-4xl mt-10 mb-15 font-bold text-blue-700">👋 Xin chào, {nameUser}!</h2>
      <div className='py-3'>
        <h3>Thống kê các chủ đề</h3>
        <div className='w-[40%] h-[40%] mx-auto'>
          {dataStatistics.length > 0 ? (<BaseChart width={300} height={300} data={dataStatistics}/>) : <p>Đang tải dữ liệu...</p>}
        </div>
      </div>
      <Table rowKey="_id" columns={columnsUser} dataSource={dataUser} className="shadow-2xl"/>
    </div>
  );
}
