import { Form, Input, Button, Row, Card, Col, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { FC, useState } from "react";
import { AdminUserClient } from "../../../clients/api.generated.clients";
import { saveToken } from "../../../common/token";
import { useHistory } from "react-router";
import { navigate } from "../../../common/navigation";
import { AdminRoutesConstant } from "../../../routes/AdminRoutes";
import "./Login.scss";

const { Title } = Typography;

export const Login: FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        await new AdminUserClient()
          .adminLogin({ username: values.username, password: values.password })
          .then((res) => {
            saveToken(res.data || "");
            navigate(history, AdminRoutesConstant.AdminPages.Home.path);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            if (!err.success) {
              message.error(err.message, 5);
            }
          });
      })
      .catch((info) => {
        setIsLoading(false);
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Row justify="space-around" align="middle" className="login_container">
      <Col xs={24} sm={16} md={10} lg={8}>
        <Card>
          <Form
            form={form}
            className="login_form"
            layout="vertical"
            onFinish={onFinish}
          >
            <Row justify="center" align="middle">
              <Col>
                <Title level={3}>Admin</Title>
              </Col>
            </Row>
            <Row justify="center" align="middle">
              <Col xs={24}>
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    autoComplete="off"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center" align="middle">
              <Col xs={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_form_button"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying" : "Log In"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
