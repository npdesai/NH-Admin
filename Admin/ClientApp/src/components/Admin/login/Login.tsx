import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Card,
  Col,
  Typography,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import "./Login.scss";

const { Title } = Typography;

export const Login: FC = () => {
  return (
    <Row justify="space-around" align="middle" className="login_container">
      <Col xs={24} sm={24} md={8}>
        <Card>
          <Form className="login_form">
            <Row justify="center" align="middle">
              <Col>
                <Title level={4}>Admin</Title>
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
                    prefix={
                      <UserOutlined
                        className="site-form-item-icon"
                        translate={undefined}
                      />
                    }
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input
                    prefix={
                      <LockOutlined
                        className="site-form-item-icon"
                        translate={undefined}
                      />
                    }
                    type="password"
                    placeholder="Password"
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
                >
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
