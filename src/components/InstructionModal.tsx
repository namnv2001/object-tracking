import { Button, Form, Modal, Select, Space } from "antd";
import { instructOptions, mqttConstants } from "constants/mqtt";
import React, { useState } from "react";
import { IPublishPayload } from "types";

interface IInstructionModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  onConfirm: (value: IPublishPayload) => void;
}

const InstructionModal = (props: IInstructionModalProps) => {
  const { showModal, setShowModal, onConfirm: publish } = props;
  const [instruction, setInstruction] = useState("");

  const [form] = Form.useForm();

  const onFinish = () => {
    publish({
      topic: mqttConstants.topic,
      payload: form.getFieldValue("select"),
      qos: 1,
    });
    setShowModal(false);
  };

  return (
    <Modal title="Gives instruction" open={showModal} footer={null}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Select command"
          name="select"
          className="mb-0"
          rules={[
            {
              required: true,
              message: "Please select a command",
            },
          ]}
        >
          <Select
            placeholder="Pick a command"
            allowClear
            value={instruction}
            options={instructOptions}
            onChange={setInstruction}
          />
        </Form.Item>
        <Form.Item className="mt-4 mb-0 flex items-center flex-row-reverse">
          <Space>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InstructionModal;
