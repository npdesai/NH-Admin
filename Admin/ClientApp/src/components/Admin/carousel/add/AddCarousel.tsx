import { InboxOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Typography,
  Upload,
} from "antd";
import React, { FC, useState } from "react";
import { useHistory } from "react-router";
import { navigate } from "../../../../common/navigation";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./AddCarousel.scss";

const { Dragger } = Upload;
const { Title } = Typography;

export const AddCarousel: FC = () => {
  const history = useHistory();

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: { dataTransfer: { files: any } }) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
    },
  };
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        console.log("values", values);
      })
      .catch((info) => {
        // console.log(info);
        setIsLoading(false);
        console.log("Validate Failed:", info);
      });
  };
  return (
    <div className="addcarousel">
      <Row justify="space-between" align="middle">
        <Col xs={12}>
          <Title level={3} className="addcarousel_pagetitle">
            Add Carousel
          </Title>
        </Col>
        <Col xs={12} className="addcarousel_action">
          <Button
            type="primary"
            className="btn"
            shape="round"
            icon={<UnorderedListOutlined />}
            size="large"
            onClick={() =>
              navigate(
                history,
                AdminRoutesConstant.AdminPages.CarouselList.path)}>
            Carousel List
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={12}>
          <Card>
            <Form {...formItemLayout} form={form} onFinish={onFinish}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please input your Title" }]}
              >
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input your Description" },
                ]}
              >
                <Input.TextArea placeholder="Description" />
              </Form.Item>
              <Form.Item
                label="Image"
                name="image"
                rules={[
                  { required: true, message: "Please choose your image" },
                ]}
              >
                <Form.Item name="image" rules={[{ required: false }]} noStyle>
                  <Dragger {...props} name="imagefile">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                </Form.Item>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 13, offset: 5 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="addcarousel_savebtn"
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
