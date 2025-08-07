import { useParams } from "react-router-dom";
import * as XLSX from 'xlsx';
import { useEffect, useState } from "react";
import { createQuestion, deleteQuestion, getQuestionsByTopicId, updateQuestion } from "../../api/apiQuestion";
import { Button, Form, Input, Select, Table, message, Upload } from "antd";
import BaseModal from "../../components/common/BaseModal";

export default function AdminQuestion() {
  const {topicId} = useParams();
  const [dataQuestions, setDataQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [editQuestion, setEditQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const fetchQuestions = async () => {
    try {
      const res = await getQuestionsByTopicId(topicId);
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDataQuestions(sorted);
    } catch (err) {
      messageApi.open({type: 'error', content: err.message});
    }
  };
  const handleAddQuestion = async () => {
    try {
      const values = await form.validateFields();
      await createQuestion({...values, topicId});
      await fetchQuestions();
      messageApi.open({type: 'success', content: 'Thêm câu hỏi thành công!'});
      form.resetFields();
      setOpen(false);
    } catch (err) {
      messageApi.open({type: 'error', content: 'Bạn chưa làm đủ các bước', err});
    }
  };
  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setDataQuestions(prev => prev.filter(q => q._id !== id));
      messageApi.open({type: 'success', content: 'Xoá câu hỏi thành công!'});
      setOpenDelete(false);
    } catch (err) {
      messageApi.open({type: 'error', content: err.message});
    }

  };
  const handleUpdateQuestion = async () => {
    try {
      const values = await form.validateFields();
      const res = await updateQuestion(currentQuestion._id, {...values, topicId});
      setDataQuestions(prev => {
        const newList = [{ ...res.data, createdAt: new Date() }, ...prev];
        return newList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      });
      messageApi.open({type: 'success', content: 'Cập nhật câu hỏi thành công!'})
      form.resetFields();
      setOpen(false);
      setEditQuestion(false);
    } catch (err) {
      messageApi.open({type: 'error', content: err.message});
    }
  };
  const handleImport = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      const formatted = rows.map((row) => ({
        questionText: row.questionText,
        options: row.options.split(";").map(opt => opt.trim()),
        answer: row.answer,
        topicId: topicId,
      }));

      try {
        for (const q of formatted) {
          await createQuestion(q);
        }
        messageApi.success("Import thành công!");
        fetchQuestions();
      } catch (err) {
        console.error(err);
        messageApi.error("Import thất bại!");
      }
    };
    reader.readAsArrayBuffer(file);
    return false;
  };

  useEffect(() => {
    fetchQuestions();
  }, [topicId]);
  const columns = [
    {
      title: 'Câu hỏi',
      dataIndex: 'questionText',
    },
    {
      title: 'Đáp án',
      dataIndex: 'options',
      render: (_, record) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Array.isArray(record.options) ? record.options : []).map((answer, index) => (
            <div key={index} className="p-2 border rounded">
              {answer}
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => {
              setEditQuestion(true);
              setCurrentQuestion(record);
              setOpen(true);
              form.setFieldsValue({
                questionText: record.questionText,
                options: record.options,
                answer: record.answer,
              });
            }}
          >
            Sửa
          </Button>
          <Button onClick={() => {setOpenDelete(true); setDeleteData(record)}}>Xoá</Button>
        </div>
      )
    }
  ];
  return (
    <>
      {contextHolder}
        <div className="w-full flex justify-end mb-4">
          <Button type="primary" onClick={() => setOpen(true)}>Thêm câu hỏi</Button>
          <Upload beforeUpload={handleImport} accept=".xlsx,.csv" showUploadList={false}>
            <Button>Import Excel</Button>
          </Upload>
          <BaseModal 
            open={open} 
            onOk={editQuestion ? handleUpdateQuestion : handleAddQuestion} 
            onCancel={() => {setOpen(false); setEditQuestion(false); form.resetFields()}} 
            footer={(
              <div className="flex gap-2 justify-end">
                <Button type="link" onClick={() => {setOpen(false); setEditQuestion(false); form.resetFields()}}>Đóng</Button> 
                <Button type="primary" onClick={editQuestion ? handleUpdateQuestion : handleAddQuestion}>{editQuestion ? "Lưu" : "Thêm"}</Button>
              </div>)} 
            title={editQuestion ? "Chỉnh sửa câu hỏi" : "Thêm Câu hỏi"}
          >
            <Form form={form} layout="vertical">
              <Form.Item name="questionText" label="Nội dung câu hỏi" rules={[{ required: true, message: "Vui lòng nhập câu hỏi" }]}>
                <Input />
              </Form.Item>

              <Form.List name="options" rules={[{ validator: (_, value) => {
                if (!value || value.length < 2) return Promise.reject("Cần ít nhất 2 đáp án");
                return Promise.resolve();
              } }]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.fieldKey} className="flex gap-2 items-center mb-2">
                        <Form.Item name={[field.name]} rules={[{ required: true, message: "Không được để trống" }]} className="flex-1">
                          <Input placeholder={`Đáp án ${index + 1}`} />
                        </Form.Item>
                        <Button danger onClick={() => remove(field.name)}>Xoá</Button>
                      </div>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                      + Thêm đáp án
                    </Button>
                  </>
                )}
              </Form.List>

              <Form.Item shouldUpdate={(prevValues, curValues) => 
                prevValues.options !== curValues.options
              }>
                {() => (
                  <Form.Item name="answer" label="Đáp án đúng" rules={[{ required: true, message: "Vui lòng chọn đáp án đúng" }]}>
                    <Select
                      placeholder="Chọn đáp án đúng"
                      options={(form.getFieldValue("options") || []).map(opt => ({
                        label: opt,
                        value: opt
                      }))}
                    />
                  </Form.Item>
                )}
              </Form.Item>

            </Form>
          </BaseModal>
        </div>
        <div className="w-full flex justify-center items-center">
            <Table columns={columns} dataSource={dataQuestions} pagination={{ pageSize: 5 }} rowKey={(record, index) => record._id || index} />
        </div>
        <BaseModal 
        open={openDelete} 
        onOk={handleDeleteQuestion} 
        onCancel={() => {setOpenDelete(false)}} 
        footer={(
          <div className="flex gap-2 justify-end">
            <Button type="link" onClick={() => setOpenDelete(false)}>Đóng</Button> 
            <Button type="primary" onClick={() => handleDeleteQuestion(deleteData ? deleteData._id : null)}>Xoá</Button>
          </div>)} 
        title='Xoá câu hỏi'>
          <div className="flex flex-col justify-center items-center">
            <h2>{`Bạn có chắc chắn muốn xoá câu hỏi: ${deleteData ? deleteData.questionText : 'này'}!`}</h2>
            <p>Nếu xác nhận xoá chủ đề này bạn sẽ không thể khôi phục lại trạng thái ban đầu</p>
          </div>
        </BaseModal>
    </>
  )
}
