import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row, Table, Typography } from "antd";
import React, { FC } from "react";
import { useHistory } from "react-router";
import { navigate } from "../../../common/navigation";
import { AdminRoutesConstant } from "../../../routes/AdminRoutes";
import "./TeamList.scss";

const { Title } = Typography;

export const TeamList: FC = () => {
  const history = useHistory();

  const TeamTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
    },
    {
      title: "IsActive",
      dataIndex: "isactive",
      align: "center",
      editable: true,
      responsive: ["lg"],
      render: () => <Checkbox />,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      align: "center",
      render: (text: any, record: any) => (
        <Button type="primary" size="small" icon={<EditOutlined />}></Button>
      ),
    },
  ];

  const TeamData = [
    {
      name: "John Brown",
      description: "New York No. 1 Lake Park",
    },
  ];

  return (
    <div className="teamlist">
      <Row justify="space-between" align="middle">
        <Col xs={12}>
          <Title level={3}>Team List</Title>
        </Col>
        <Col xs={12} className="teamlist_action">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            size="middle"
            className="btn"
            onClick={() =>
              navigate(history, AdminRoutesConstant.AdminPages.AddTeam.path)
            }
          >
            Add Team
          </Button>
        </Col>
      </Row>
      <Row className="carousellist_table">
        <Col xs={24}>
          <Table
            scroll={{ y: 240 }}
            dataSource={TeamData}
            columns={TeamTableColumns}
          />
        </Col>
      </Row>
    </div>
  );
};
