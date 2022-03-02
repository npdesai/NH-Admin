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
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { httpWithTokenInHeader } from "../../../../clients/api.clients.base";
import { CarouselClient } from "../../../../clients/api.generated.clients";
import { navigate } from "../../../../common/navigation";
import { validateImage } from "../../../../hooks/validator";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./EditCarousel.scss";

const { Dragger } = Upload;
const { Title } = Typography;

export const EditCarousel: FC = () => {
  const history = useHistory();
  const params = useParams();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    new CarouselClient("", httpWithTokenInHeader)
      .getCarouselById(params.id)
      .then((result) => {
        if (result.success) {
          form.setFieldsValue({
            title: result.data && result.data.title,
            description: result.data && result.data.description,
            image: result.data && result.data.image,
            active: result.data && result.data.isActive,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [params.id != undefined]);

  const onFinish = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then((values) => {
        if (values.image) {
          let reader = new FileReader();
          reader.readAsDataURL(values.image.fileList[0].originFileObj);
          let base64String: string = "";
          reader.onloadend = async function (e: any) {
            base64String = e.target.result;
            updateCarousel(values, base64String);
          };
        } else {
          updateCarousel(values, undefined);
        }
      })
      .catch((info) => {
        setIsLoading(false);
        console.log("Validate Failed:", info);
      });
  };

  const updateCarousel = async (values: any, base64String: any) => {
    await new CarouselClient("", httpWithTokenInHeader)
      .updateCarousel({
        id: params.id,
        title: values.title,
        description: values.description,
        image: base64String,
        isActive: values.active,
      })
      .then((res) => {
        navigate(history, AdminRoutesConstant.AdminPages.CarouselList.path);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (!err.success) {
          message.error(err.message, 5);
        }
      });
  };

  return (
    <div className="editcarousel">
      <Row gutter={[0, { xs: 16 }]} justify="space-between" align="middle">
        <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
          <Title level={3} className="editcarousel_pagetitle">
            Edit Carousel
          </Title>
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          md={{ span: 12, order: 2 }}
          className="editcarousel_action"
        >
          <Button
            type="primary"
            className="btn"
            icon={<UnorderedListOutlined />}
            size="middle"
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
      <Row className="editcarousel_content">
        <Col xs={24}>
          <Card>
            <Form
              form={form}
              onFinish={onFinish}
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
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Description",
                      },
                    ]}
                  >
                    <Input.TextArea placeholder="Description" />
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
                    rules={[
                      {
                        required: true,
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
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="editcarousel_savebtn"
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
