import { InboxOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography, Upload } from "antd";
import React, { FC } from "react";
import { useHistory } from "react-router";
import { navigate } from "../../../../common/navigation";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./AddCarousel.scss";

const { Title } = Typography;

export const AddCarousel: FC = () => {
  const history = useHistory();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
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
            <Form {...formItemLayout}>
              <Form.Item label="Title">
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item label="Description">
                <Input.TextArea placeholder="Description" />
              </Form.Item>
              <Form.Item label="Image">
                <Form.Item name="image" valuePropName="file" noStyle>
                  <Upload.Dragger name="imagefile">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
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
