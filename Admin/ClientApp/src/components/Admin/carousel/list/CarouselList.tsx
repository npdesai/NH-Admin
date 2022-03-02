import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row, Table, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { httpWithTokenInHeader } from "../../../../clients/api.clients.base";
import { CarouselClient } from "../../../../clients/api.generated.clients";
import { navigate } from "../../../../common/navigation";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./CarouselList.scss";

const { Title } = Typography;

export const CarouselList: FC = () => {
  const history = useHistory();
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    new CarouselClient()
      .getCarousels()
      .then((response) => {
        let carouselTableData: any = [];
        response.data &&
          response.data.map((carousel) => {
            carouselTableData.push({
              key: carousel.id,
              title: carousel.title,
              description: carousel.description,
              image: carousel.image,
              isActive: carousel.isActive,
            });
          });
        setCarouselData(carouselTableData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCheckboxChange = async (checked: any, rowIndex: any) => {
    const newCheckboxState = [...carouselData];
    newCheckboxState[rowIndex].isActive = checked;
    setCarouselData(newCheckboxState);
    await new CarouselClient("", httpWithTokenInHeader)
      .updateCarouselActiveStatus(newCheckboxState[rowIndex].key, checked)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const edit = (id: any) => {
    navigate(
      history,
      AdminRoutesConstant.AdminPages.EditCarousel.path.replace(":id", id)
    );
  };

  const carouselTableColumns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "15%",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      width: "20%",
      render: (_image: any) => <img height={40} src={_image} />,
    },
    {
      title: "IsActive",
      dataIndex: "isActive",
      width: "10%",
      editable: true,
      align: "center",
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
    <div className="carousellist">
      <Row justify="space-between" align="middle">
        <Col xs={12}>
          <Title level={3} className="carousellist_pagetitle">
            Carousel List
          </Title>
        </Col>
        <Col xs={12} className="carousellist_action">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            size="middle"
            className="btn"
            onClick={() =>
              navigate(history, AdminRoutesConstant.AdminPages.AddCarousel.path)
            }
          >
            Add Carousel
          </Button>
        </Col>
      </Row>
      <Row className="carousellist_table">
        <Col xs={24}>
          <Table
            size="small"
            dataSource={carouselData}
            columns={carouselTableColumns}
          />
        </Col>
      </Row>
    </div>
  );
};
