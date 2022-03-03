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
  Image,
} from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { httpWithTokenInHeader } from "../../../../clients/api.clients.base";
import { CarouselClient } from "../../../../clients/api.generated.clients";
import { navigate } from "../../../../common/navigation";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./EditCarousel.scss";

const { Dragger } = Upload;
const { Title } = Typography;

export const EditCarousel: FC = () => {
  const history = useHistory();
  const params = useParams();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | undefined>(
    undefined
  );
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    new CarouselClient("", httpWithTokenInHeader)
      .getCarouselById(params.id)
      .then((result) => {
        if (result.success) {
          setImage(result.data && result.data.image);
          setOriginalImage(result.data && result.data.image);
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

  const convertImageToBase64 = (value: any) => {
    if (value.fileList.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(value.fileList[0].originFileObj);
      let base64String: string = "";
      reader.onloadend = async function (e: any) {
        base64String = e.target.result;
        setImage(base64String);
      };
    }
  };

  const onFinish = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then((values) => {
        if (values.image) {
          console.log(values);
          if (values.image.fileList) {
            if (values.image.fileList[0].type.match("image.*")) {
              updateCarousel(values, image);
            } else {
              setIsLoading(false);
              message.error(`Please choose only image`);
            }
          } else {
            updateCarousel(values, image);
          }
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
                        onChange={convertImageToBase64}
                        multiple={false}
                        beforeUpload={(file) => {
                          if (!file.type.match("image.*")) {
                            message.error(`Please choose only image`);
                          }
                          return false;
                        }}
                        maxCount={1}
                        accept="image/*"
                        onRemove={() => {
                          setImage(originalImage);
                        }}
                      >
                        {!image ? (
                          <>
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Click or drag file to this area to upload
                            </p>
                          </>
                        ) : (
                          <Image preview={{ visible: false }} src={image} />
                        )}
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
