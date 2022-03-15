import { UnorderedListOutlined, InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Rate,
  Row,
  Typography,
  Upload,
  Image,
} from "antd";
import React, { FC, useState } from "react";
import { useHistory } from "react-router";
import { httpWithTokenInHeader } from "../../../../clients/api.clients.base";
import { ClientClient } from "../../../../clients/api.generated.clients";
import { navigate } from "../../../../common/navigation";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./AddClient.scss";

const { Dragger } = Upload;
const { Title } = Typography;

export const AddClient: FC = () => {
  const history = useHistory();

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);

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

  const AddClient = async (values: any, base64String: string) => {
    await new ClientClient("", httpWithTokenInHeader)
      .addClient({
        name: values.name,
        feedback: values.feedback,
        image: base64String,
        isActive: values.active,
        location: values.location,
        rating: values.rate,
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
  const onFinish = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then((values) => {
        let base64String: string = "";
        if (values.image != undefined) {
          let reader = new FileReader();
          reader.readAsDataURL(values.image.fileList[0].originFileObj);
          reader.onloadend = async function (e: any) {
            base64String = e.target.result;
            AddClient(values, base64String);
          };
          return;
        }
        AddClient(values, base64String);
      })
      .catch((info) => {
        setIsLoading(false);
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div className="addclient">
      <Row gutter={[0, { xs: 16 }]} justify="space-between" align="middle">
        <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
          <Title level={3} className="addclient_pagetitle">
            Add Client
          </Title>
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          md={{ span: 12, order: 2 }}
          className="addclient_action"
        >
          <Button
            type="primary"
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
      <Row className="addclient_content">
        <Col xs={24}>
          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
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
                      { required: true, message: "Please input your Name" },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item label="Feedback" name="feedback">
                    <Input.TextArea placeholder="Feedback" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24, order: 3 }} md={{ span: 12, order: 3 }}>
                  <Form.Item name="location" label="Location">
                    <Input placeholder="Location " />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24, order: 4 }} md={{ span: 12, order: 3 }}>
                  <Form.Item name="rate" label="Rate">
                    <Rate allowHalf />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24, order: 5 }} md={{ span: 12, order: 3 }}>
                  <Form.Item
                    label="Active"
                    name="active"
                    valuePropName="checked"
                  >
                    <Checkbox />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 2 }}>
                  <Form.Item label="Image" name="image">
                    <Form.Item name="image" noStyle valuePropName="file">
                      <Dragger
                        onChange={convertImageToBase64}
                        multiple={false}
                        beforeUpload={() => {
                          return false;
                        }}
                        maxCount={1}
                        accept="image/*"
                        onRemove={() => {
                          setImage(undefined);
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
                      className="addclient_savebtn"
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
