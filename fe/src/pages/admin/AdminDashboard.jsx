import { useEffect, useState } from 'react';
import { Table, Tag, Button } from 'antd';
import { deleteUser, getUsers } from '../../api/apiUser';
import { authProvider } from '../../context/auth';
import { getApiChartAdmin } from '../../api/apiAdmin';
import BaseChart from '../../components/BaseChart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export default function AdminDashboard () {
  const [nameUser, setNameUser] = useState('');
  const queryClient = useQueryClient();

  const {data: users} = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    select: res => res.data
  });
  const {data: dataStatistics, isLoading: isLoadingStats} = useQuery({
    queryKey: ['chart-admin'],
    queryFn: getApiChartAdmin,
    select: res => res.data
  });
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
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
     deleteUserMutation.mutate(id);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(()=> {
    setNameUser(authProvider.user.name);
  }, [])
  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-4xl mt-10 mb-15 font-bold text-blue-700">👋 Xin chào, {nameUser}!</h2>
      <div className='py-3'>
        <h3>Thống kê các chủ đề</h3>
        <div className='w-[40%] h-[40%] mx-auto'>
          {isLoadingStats ? (<p>Đang tải dữ liệu...</p>) : (<BaseChart width={300} height={300} data={dataStatistics} />)}
        </div>
      </div>
      <Table rowKey="_id" columns={columnsUser} dataSource={users} className="shadow-2xl"/>
    </div>
  );
}
