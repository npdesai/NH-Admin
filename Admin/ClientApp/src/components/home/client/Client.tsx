import { Col, Rate, Row, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import React, { FC, useEffect, useState } from "react";
import { ClientClient } from "../../../clients/api.generated.clients";
import "./Client.scss";

export const Client: FC = () => {
  const [clientData, setClientData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new ClientClient()
      .getClients(true, false)
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
  return (
    <>
      <Row justify="center" align="middle">
        <Col>
          <Title level={2}>Our Clients</Title>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <div className="client_container">
            {clientData.length > 0 ? (
              <>
                {clientData.map((ele: any, index) =>
                  index % 2 == 0 ? (
                    <article className="postcard imgcard">
                      <Row gutter={[16, 16]} justify="center" align="middle">
                        <Col
                          xs={24}
                          md={24}
                          lg={4}
                          className="postcard_img_container"
                        >
                          <Row
                            justify="center"
                            align="middle"
                            className="postcard_imc"
                          >
                            <Col>
                              <img className="postcard_img" src={ele.image} />
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={24} md={24} lg={19}>
                          <div className="postcard_text">
                            <h3>{ele.name}</h3>
                            <div>
                              <Rate
                                className="postcard_text_lcname"
                                allowHalf
                                value={ele.rating}
                                disabled
                              />
                              <h2 className="postcard_text_locname">
                                {ele.location}
                              </h2>
                            </div>
                            <div className="postcard_preview-txt">
                              <text>{ele.feedback}</text>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </article>
                  ) : (
                    <article className="postcard cards">
                      <Row gutter={[16, 16]} justify="center" align="middle">
                        <Col xs={24} md={24} lg={19}>
                          <div className="postcard_text">
                            <div>
                              <h3>{ele.name}</h3>
                            </div>
                            <div>
                              <Rate
                                className="postcard_text_lcname"
                                allowHalf
                                value={ele.rating}
                                disabled
                              />
                              <h2 className="postcard_text_locname">
                                {ele.location}
                              </h2>
                            </div>
                            <div className="postcard_preview-txt">
                              <text>{ele.feedback}</text>
                            </div>
                          </div>
                        </Col>
                        <Col
                          xs={24}
                          md={24}
                          lg={4}
                          className="postcard_img_container"
                        >
                          <Row
                            justify="center"
                            align="middle"
                            className="postcard_imc"
                          >
                            <Col>
                              <img
                                className="postcard_img"
                                src={ele.image}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </article>
                  )
                )}
              </>
            ) : (
              <Skeleton.Input active={true} />
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
