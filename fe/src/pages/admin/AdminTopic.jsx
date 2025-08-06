import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutDefault from "../../layouts/LayoutDefault";
import BaseModal from "../../components/common/BaseModal";
import { createTopic, deleteTopic, getTopics, updateTopic } from "../../api/apiTopic";
import { Button, Form, Input, Dropdown, message, Table, Select } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { hasEmptyStringOrNoData } from "../../utils/object";

export default function AdminTopic() {
  const [topics, setTopics] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const res = await deleteTopic(id);
      setTopics(prev => prev.filter(t => t._id !== id));
      messageApi.open({type: 'success', content: res.data.message});
      setOpenDelete(false);
    } catch (err) {
      messageApi.open({type: 'error', content: err.message});
    }
  };

  const handleAddTopic = async () => {
    try {
      const values = await form.validateFields();
      if(!hasEmptyStringOrNoData(values)){
        const res = await createTopic(values);
        setTopics(prev => [...prev, res.data]);
        messageApi.open({type: 'success', content: 'Tạo chủ đề mới thành công!'});
        form.resetFields();
        setOpen(false);
      } else {
        messageApi.open({type: 'error', content: 'Hãy thêm đầy đủ thông tin!'});
      }
    } catch (err) {
      messageApi.open({type: 'error', content: err.message});
    }
  };

  const handleUpdateTopic = async () => {
    try {
      const values = await form.validateFields();
      const res = await updateTopic(currentTopic._id, values);
      setTopics(prev => prev.map(t => (t._id === currentTopic._id ? res.data : t)));
      form.resetFields();
      messageApi.open({type: 'success', content: 'Cập nhật chủ đề thành công'});
      setOpen(false);
    } catch (err) {
      messageApi.open({type: 'error', content: err.message});
    }
  }

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await getTopics();
        setTopics(res.data);
      } catch (err) {
        message.error(err.message);
      }
    };
    fetchTopics();
  }, []);
  const columns = [
    {title: 'Tên chủ đề', dataIndex: 'topicName'},
    {title: 'Mô tả', dataIndex: 'descriptionTopic'},
    {
      title: "Hành động",
      render: (_, record) => {
        const menuItems = [
          {
            key: 'manage',
            label: 'Quản lý câu hỏi',
            onClick: () => navigate(`/admin/topic/${record._id}/questions`)
          },
          {
            key: 'edit',
            label: 'Sửa',
            onClick: () => {
              setEditMode(true);
              setCurrentTopic(record);
              setOpen(true);
              form.setFieldsValue({
                topicName: record.topicName,
                descriptionTopic: record.descriptionTopic,
              });
            }
          },
          {
            key: 'delete',
            label: 'Xoá',
            disable: true,
            danger: true,
            onClick: () => {
              setDeleteData(record);
              setOpenDelete(true);
            }
          },
        ];

        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      }
    }
  ];
  return (
    <>
      {contextHolder}
      <h1 className="text-2xl font-medium text-center mb-10">Quản lý Chủ đề</h1>
      <div className="w-full flex justify-end mb-4">
        <Button type="primary" onClick={() => setOpen(true)}>Thêm chủ đề</Button>
        <BaseModal 
          open={open} 
          onOk={editMode ? handleUpdateTopic : handleAddTopic} 
          onCancel={() => {setOpen(false); setEditMode(false); form.resetFields()}} 
          footer={(
            <div className="flex gap-2 justify-end">
              <Button type="link" onClick={() => {setOpen(false); setEditMode(false); form.resetFields()}}>Đóng</Button> 
              <Button type="primary" onClick={editMode ? handleUpdateTopic : handleAddTopic}>{editMode ? "Lưu" : "Thêm"}</Button>
            </div>)} 
          title={editMode ? "Chỉnh sửa Chủ Đề" : "Thêm Chủ Đề"}>
            <Form form={form} layout="vertical">
              <Form.Item name="topicName" label="Tên chủ đề">
                <Input />
              </Form.Item>
              <Form.Item name="imgTopic" label="Hình ảnh">
                <Input />
              </Form.Item>
              <Form.Item name="descriptionTopic" label="Mô tả">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item name="duration" label="Thời gian làm bài (phút)" rules={[{ required: true, message: "Vui lòng chọn thời gian làm bài" }]}>
                <Select placeholder="Chọn thời gian">
                  {[5, 10, 15, 20, 30, 60].map((min) => (<Select.Option key={min} value={min}>{min} phút</Select.Option>))}
                </Select>
              </Form.Item>
            </Form>
          </BaseModal>
      </div>
      <Table columns={columns} dataSource={topics} rowKey={'_id'} />
      <BaseModal 
        open={openDelete} 
        onOk={handleDelete} 
        onCancel={() => {setOpenDelete(false)}} 
        footer={(
          <div className="flex gap-2 justify-end">
            <Button type="link" onClick={() => setOpenDelete(false)}>Đóng</Button> 
            <Button type="primary" onClick={() => handleDelete(deleteData ? deleteData._id: null)}>Xoá</Button>
          </div>)} 
        title='Xoá chủ đề'>
          <div className="flex flex-col justify-center items-center">
            <h2>{`Bạn có chắc chắn muốn xoá Chủ đề ${deleteData ? deleteData.topicName : 'này'}!`}</h2>
            <p>Nếu xác nhận xoá chủ đề này bạn sẽ không thể khôi phục lại trạng thái ban đầu</p>
          </div>
      </BaseModal>
    </> 
  )
}
