import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { CarouselClient } from "../../../../clients/api.generated.clients";
import { navigate } from "../../../../common/navigation";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./CarouselList.scss";

const { Title } = Typography;
const onchange = () => {};
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
      render: (_Checkbox: any) => (
        <input type="checkbox" onChange={onchange} checked={_Checkbox} />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      render: (_button: any) => <Button>Edit</Button>,
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
            shape="round"
            icon={<PlusCircleOutlined />}
            size="large"
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
          <Table dataSource={carouselData} columns={carouselTableColumns} />
        </Col>
      </Row>
    </div>
  );
};
