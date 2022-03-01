import { InboxOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
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
import { httpWithTokenInHeader } from "../../../../clients/api.clients.base";
import { CarouselClient } from "../../../../clients/api.generated.clients";
import { navigate } from "../../../../common/navigation";
import { validateImage } from "../../../../hooks/validator";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./AddCarousel.scss";

const { Dragger } = Upload;
const { Title } = Typography;

export const AddCarousel: FC = () => {
  const history = useHistory();

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
      .then((values) => {
        let reader = new FileReader();
        reader.readAsDataURL(values.image.fileList[0].originFileObj);
        let base64String: string = "";
        reader.onloadend = async function (e: any) {
          base64String = e.target.result;
          await new CarouselClient("", httpWithTokenInHeader)
            .addCarousel({
              title: values.title,
              description: values.description,
              image: base64String,
              isActive: values.active,
            })
            .then((res) => {
              navigate(
                history,
                AdminRoutesConstant.AdminPages.CarouselList.path
              );
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
              if (!err.success) {
                message.error(err.message, 5);
              }
            });
        };
      })
      .catch((info) => {
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
                AdminRoutesConstant.AdminPages.CarouselList.path
              )
            }
          >
            Carousel List
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={12}>
          <Card>
            <Form
              {...formItemLayout}
              form={form}
              onFinish={onFinish}
              initialValues={{
                active: true,
              }}
            >
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
                  {
                    required: true,
                    message: "Please choose your image",
                    validator: validateImage,
                  },
                ]}
              >
                <Form.Item
                  name="image"
                  rules={[{ required: false }]}
                  noStyle
                  valuePropName="file"
                >
                  <Dragger
                    multiple={false}
                    beforeUpload={() => {
                      return false;
                    }}
                    maxCount={1}
                    accept="image/*"
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                </Form.Item>
              </Form.Item>
              <Form.Item label="Active" name="active" valuePropName="checked">
                <Checkbox />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 13, offset: 5 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="addcarousel_savebtn"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving" : "Save"}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
