import { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { createUser, deleteUser, getUsers } from '../../api/apiUser';
import BaseButton from '../../components/common/BaseButton';
import FormAddUser from '../../components/FormAddUser';
import LayoutDefault from '../../layouts/LayoutDefault';


export default function AdminDashboard () {
  const [dataUser, setDataUser] = useState([]);
  const [nameUser, setNameUser] = useState('');
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
        <BaseButton
          label="Delete"
          colorBtn="#eb5151"
          text="white"
          onClick={() => handleDeleteUser(record._id)}
        />
      ),
    },
  ];

  const handleAddUser = async (user) => {
    const res = await createUser(user);
    setDataUser([...dataUser, res.data]);
  }
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
        const res = await getUsers();
        setDataUser(res.data);
    } catch (err) {
        console.error(err);
      }            
    }
    setNameUser(JSON.parse(localStorage.getItem('user')).name);
    fetchData();
  }, [])
  return (
    <LayoutDefault>
      <div className="flex flex-col min-h-screen">
        <h2 className='text-2xl font-bold'>Xin chào, {nameUser}!</h2>
        <div className="w-full text-end">
          <FormAddUser handleAddUser={handleAddUser} />
        </div>
        <Table rowKey="_id" columns={columnsUser} dataSource={dataUser} className="shadow-2xl"/>
      </div>
    </LayoutDefault>
  );
}
