import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row, Table, Typography, Image } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { httpWithTokenInHeader } from "../../../../clients/api.clients.base";
import { TeamClient } from "../../../../clients/api.generated.clients";
import { navigate } from "../../../../common/navigation";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./TeamList.scss";

const { Title } = Typography;

export const TeamList: FC = () => {
  const history = useHistory();
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new TeamClient()
      .getTeams()
      .then((response) => {
        let TeamTableData: any = [];
        response.data &&
          response.data.map((team) => {
            TeamTableData.push({
              key: team.id,
              title: team.title,
              name: team.name,
              details: team.details,
              image: team.image,
              isActive: team.isActive,
              isDelete: team.isDelete,
            });
          });

        setTeamData(TeamTableData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const handleCheckboxChange = async (checked: any, rowIndex: any) => {
    const newCheckboxState = [...teamData];
    newCheckboxState[rowIndex].isActive = checked;
    setTeamData(newCheckboxState);
    await new TeamClient("", httpWithTokenInHeader)
      .updateTeamActiveStatus(newCheckboxState[rowIndex].key, checked)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const Delete = async (rowIndex: any, value: any) => {
    const newDeleteCheckbox = [...teamData];
    newDeleteCheckbox[rowIndex].isDelete = value;
    setTeamData(newDeleteCheckbox);
    await new TeamClient("", httpWithTokenInHeader)
      .updateTeamDeleteStatus(newDeleteCheckbox[rowIndex].key, value)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const edit = (id: any) => {
    navigate(
      history,
      AdminRoutesConstant.AdminPages.EditTeam.path.replace(":id", id)
    );
  };

  const expandedRowRender = (values: any) => {
    const TeamTableColumns = [
      {
        title: "Title",
        dataIndex: "title",
      },
      {
        title: "Details",
        dataIndex: "details",
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
        title: values.title,
        details: values.details,
        isDelete: values.isDelete,
      },
    ];
    return (
      <Table
        columns={TeamTableColumns}
        dataSource={tableData}
        pagination={false}
      />
    );
  };
  const TeamTableColumns = [
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
      <Row className="teamlist_table">
        <Col xs={24}>
          <Table
            dataSource={teamData}
            expandable={{
              expandedRowRender: (record) => expandedRowRender(record),
            }}
            columns={TeamTableColumns}
            loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
};
