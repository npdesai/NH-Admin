import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React, { FC } from "react";
import { Card } from "react-bootstrap";
import "./Client.scss";

export const Client: FC = () => {
  return (
    <Row justify="center" align="middle">
      <Col>
        <Title level={2}>Our Clients</Title>
      </Col>
    </Row>
  );
};
