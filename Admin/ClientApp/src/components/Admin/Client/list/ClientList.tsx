import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Input,
  Rate,
  Row,
  Table,
  Image,
  Typography,
} from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { httpWithTokenInHeader } from "../../../../clients/api.clients.base";
import { ClientClient } from "../../../../clients/api.generated.clients";
import { navigate } from "../../../../common/navigation";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./ClientList.scss";
const { Title } = Typography;

export const ClientList: FC = () => {
  const history = useHistory();
  const [clientData, setClientData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    new ClientClient()
      .getClients()
      .then((response) => {
        let ClientTableData: any = [];
        response.data &&
          response.data.map((client) => {
            ClientTableData.push({
              key: client.id,
              name: client.name,
              feedback: client.feedback,
              rating: client.rating,
              location: client.location,
              isActive: client.isActive,
              image: client.image,
              isDelete: client.isDelete,
            });
          });
        setClientData(ClientTableData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);
  const handleCheckboxChange = async (checked: any, rowIndex: any) => {
    const newCheckboxState = [...clientData];
    newCheckboxState[rowIndex].isActive = checked;
    setClientData(newCheckboxState);
    await new ClientClient("", httpWithTokenInHeader)
      .updateClientActiveStatus(newCheckboxState[rowIndex].key, checked)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };
  const Delete = async (rowIndex: any, value: any) => {
    const newDeleteCheckbox = [...clientData];
    newDeleteCheckbox[rowIndex].isDelete = value;
    setClientData(newDeleteCheckbox);
    await new ClientClient("", httpWithTokenInHeader)
      .updateClientDeleteStatus(newDeleteCheckbox[rowIndex].key, value)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };
  const edit = (id: any) => {
    navigate(
      history,
      AdminRoutesConstant.AdminPages.EditClient.path.replace(":id", id)
    );
  };
  const expandedRowRender = (values: any) => {
    const ClientTableColumns = [
      {
        title: "Feedback",
        dataIndex: "feedback",
      },
      {
        title: "Rating",
        dataIndex: "rating",
        align: "center",
        render: () => <Rate allowHalf value={values.rating} disabled />,
      },
      {
        title: "Location",
        dataIndex: "location",
        align: "center",
      },
      {
        title: "IsDelete",
        dataIndex: "isDelete",
        align: "center",
        width: "10%",
        editable: true,
        responsive: ["lg"],
        render: (value: any, record: any, rowIndex: any) => (
          <Checkbox
            checked={record.isDelete}
            onClick={() => Delete(rowIndex, !value)}
          />
        ),
      },
    ];
    const tableData = [
      {
        feedback: values.feedback,
        rating: values.rating,
        location: values.location,
        isDelete: values.isDelete,
      },
    ];
    return (
      <Table
        columns={ClientTableColumns}
        dataSource={tableData}
        pagination={false}
      />
    );
  };
  const ClientTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Image",
      dataIndex: "image",
      width: "15%",
      align: "center",
      render: (_image: any) => <Image src={_image} preview={{ src: _image }} />,
    },

    {
      title: "IsActive",
      dataIndex: "isActive",
      align: "center",
      editable: true,
      width: "10%",
      render: (value: any, record: any, rowIndex: any) => (
        <Checkbox
          checked={record.isActive}
          onChange={() => handleCheckboxChange(!value, rowIndex)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      align: "center",
      render: (text: any, record: any) => (
        <Button
          type="primary"
          size="small"
          icon={<EditOutlined />}
          onClick={() => edit(record.key)}
        ></Button>
      ),
    },
  ];
  return (
    <div className="clientlist">
      <Row justify="space-between" align="middle">
        <Col xs={12}>
          <Title level={3}>Client List</Title>
        </Col>
        <Col xs={12} className="clientlist_action ">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            size="middle"
            className="btn"
            onClick={() =>
              navigate(history, AdminRoutesConstant.AdminPages.AddClient.path)
            }
          >
            Add Client
          </Button>
        </Col>
      </Row>
      <Row className="clientlist_table">
        <Col xs={24}>
          <Table
            dataSource={clientData}
            columns={ClientTableColumns}
            loading={isLoading}
            expandable={{
              expandedRowRender: (record) => expandedRowRender(record),
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
