import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import React, { FC } from "react";
import { useHistory } from "react-router";
import { navigate } from "../../../../common/navigation";
import { AdminRoutesConstant } from "../../../../routes/AdminRoutes";
import "./CarouselList.scss";

const { Title } = Typography;

export const CarouselList: FC = () => {
  const history = useHistory();
  return (
    <div className="carousellist">
      <Row justify="space-between" align="middle">
        <Col xs={12}>
          <Title level={3} className="carousellist_pagetitle">Carousel List</Title>
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
    </div>
  );
};
