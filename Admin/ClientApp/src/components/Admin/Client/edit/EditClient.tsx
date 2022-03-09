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
  Rate,
} from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { httpWithTokenInHeader } from "../../../../clients/api.clients.base";
import { ClientClient } from "../../../../clients/api.generated.clients";
import { navigate } from "../../../../common/navigation";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./EditClient.scss";

const { Dragger } = Upload;
const { Title } = Typography;

export const EditClient: FC = () => {
  const history = useHistory();
  const params = useParams();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | undefined>(
    undefined
  );
  const [image, setImage] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    new ClientClient("", httpWithTokenInHeader)
      .getClientById(params.id)
      .then((result) => {
        if (result.success) {
          setImage(result.data && result.data.image);
          setOriginalImage(result.data && result.data.image);
          form.setFieldsValue({
            name: result.data && result.data.name,
            feedback: result.data && result.data.feedback,
            rating: result.data && result.data.rating,
            image: result.data && result.data.image,
            active: result.data && result.data.isActive,
            location: result.data && result.data.location,
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
          if (values.image.fileList) {
            if (values.image.fileList[0].type.match("image.*")) {
              updateClient(values, image);
            } else {
              setIsLoading(false);
              message.error(`Please choose only image`);
            }
          } else {
            updateClient(values, image);
          }
        } else {
          updateClient(values, undefined);
        }
      })
      .catch((info) => {
        setIsLoading(false);
        console.log("Validate Failed:", info);
      });
  };
 const updateClient = async (values: any, base64String: any) => {
    await new ClientClient("", httpWithTokenInHeader)
      .updateClient({
        id: params.id,
        name: values.name,
        feedback: values.feedback,
        image: base64String,
        rating: values.rating,
        isActive: values.active,
        location: values.location,
      })
      .then((res) => {
        setIsLoading(false);
        navigate(history, AdminRoutesConstant.AdminPages.ClientList.path);
      })
      .catch((err) => {
        setIsLoading(false);
        if (!err.success) {
          message.error(err.message, 5);
        }
      });
  };
return (
    <div className="editclient">
      <Row gutter={[0, { xs: 16 }]} justify="space-between" align="middle">
        <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
          <Title level={3} className="editcarousel_pagetitle">
            Edit ClientList
          </Title>
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          md={{ span: 12, order: 2 }}
          className="editclient_action"
        >
          <Button
            type="primary"
            className="btn"
            icon={<UnorderedListOutlined />}
            size="middle"
            onClick={() =>
              navigate(history, AdminRoutesConstant.AdminPages.ClientList.path)
            }
          >
            Client List
          </Button>
        </Col>
      </Row>
      <Row className="editclient_content">
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
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please input your Title" },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item label="Feedback" name="feedback">
                    <Input.TextArea placeholder="Feedback" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24, order: 4 }} md={{ span: 12, order: 3 }}>
                  <Form.Item label="Location" name="location">
                    <Input placeholder="Location" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24, order: 4 }} md={{ span: 12, order: 3 }}>
                  <Form.Item label="Rating" name="rating">
                    <Rate allowHalf />
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
                        required: false,
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
              <Row gutter={[0, 24]} justify="center" align="middle">
                <Col span={5}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="editclient_savebtn"
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving" : "Save"}
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button
                      type="default"
                      className="editclient_cancelbtn"
                      onClick={() =>
                        navigate(
                          history,
                          AdminRoutesConstant.AdminPages.ClientList.path
                        )
                      }
                    >
                      {isLoading ? "cancelled" : "Cancel"}
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
