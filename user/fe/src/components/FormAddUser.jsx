import { useState } from "react";
import { Button, Form, Input, Modal, Radio } from "antd";
import BaseButton from "./common/BaseButton";
const FormAddUser = ({handleAddUser}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    handleAddUser(values);
    setOpen(false);
  };
  return (
    <>
      <BaseButton
        label="+ Add User"
        text="white"
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        title="Create a new user"
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setOpen(false)}
        destroyOnHidden
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please input the name of collection!" },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input type="email" />
        </Form.Item>
      </Modal>
    </>
  );
};
export default FormAddUser;
