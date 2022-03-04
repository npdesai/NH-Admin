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
import { navigate } from "../../../../common/navigation";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./AddTeam.scss";

const { Dragger } = Upload;
const { Title } = Typography;

export const AddTeam: FC = () => {
  const history = useHistory();

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="addteam">
      <Row gutter={[0, { xs: 16 }]} justify="space-between" align="middle">
        <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
          <Title level={3} className="addteam_pagetitle">
            Add Team
          </Title>
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          md={{ span: 12, order: 2 }}
          className="addteam_action"
        >
          <Button 
            type="primary"
            className="btn"
            icon={<UnorderedListOutlined />}
            size="middle"
            onClick={() =>
              navigate(history, AdminRoutesConstant.AdminPages.TeamList.path)
            }
          >
            Team List
          </Button>
        </Col>
      </Row>
      <Row className="addteam_content">
        <Col xs={24}>
          <Card>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                active: true,
              }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={{ span: 24, order: 1 }} md={{ span: 12, order: 1 }}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                      { required: true, message: "Please input your Title" },
                    ]}
                  >
                    <Input placeholder="Title" />
                  </Form.Item>
                  <Form.Item
                    label="Discription"
                    name="discription"
                    rules={[
                      {
                        required: true,
                        message: "Please input your descrption",
                      },
                    ]}
                  >
                    <Input.TextArea placeholder="Image" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24, order: 3 }} md={{ span: 12, order: 3 }}>
                  <Form.Item
                    label="Active"
                    name="active"
                    valuePropName="checked"
                  >
                    <Checkbox />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 2 }}>
                  <Form.Item
                    label="Image"
                    name="image"
                   >
                    <Form.Item
                      name="image"
                      rules={[{ required: false }]}
                      noStyle
                      valuePropName="file"
                    >
                      <Dragger>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                      </Dragger>
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col>
                  <Form.Item>
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
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
