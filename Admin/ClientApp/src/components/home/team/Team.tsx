import {
  Button,
  Card,
  Col,
  Drawer,
  Image,
  Row,
  Skeleton,
  Typography,
} from "antd";
import React, { FC, useEffect, useState } from "react";
import { TeamClient } from "../../../clients/api.generated.clients";
import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "./Team.scss";
import {  EyeOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export const Team: FC = () => {
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrevHide, setPrevHide] = useState(true);
  const [isNextHide, setNextHide] = useState(false);
  const [visible, setVisible] = useState<number>();

  const showDrawer = (value: number) => {
    setVisible(value);
  };

  const onclose = () => {
    setVisible(NaN);
  };

  useEffect(() => {
    new TeamClient()
      .getTeams(true, false)
      .then((response) => {
        if (response.success) {
          let teamTableData: any = [];
          response.data &&
            response.data.map((team) => {
              teamTableData.push({
                key: team.id,
                title: team.title,
                name: team.name,
                details: team.details,
                image: team.image,
                isActive: team.isActive,
              });
            });

          setTeamData(teamTableData);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const onBeforeChange = (currentSlide: number, nextSlide: number) => {
    setPrevHide(nextSlide === 0);
    setNextHide(teamData.length - 4 === nextSlide);
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: isPrevHide ? "none" : "block" }}
        onClick={onClick}
      />
    );
  };

  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: isNextHide ? "none" : "block" }}
        onClick={onClick}
      />
    );
  };

  let settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 813,
        settings: {
          arrows: false,
          touchMove: true,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 736,
        settings: {
          arrows: false,
          touchMove: true,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 667,
        settings: {
          arrows: false,
          touchMove: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          arrows: false,
          touchMove: true,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="team_container">
      <div>
        <Row justify="center" align="middle">
          <Col>
            <Title level={2}>Our Teams</Title>
          </Col>
        </Row>
      </div>
      <div>
        {!isLoading ? (
          <Slider
            {...settings}
            className="team_slider"
            beforeChange={(currentSlide, nextSlide) =>
              onBeforeChange(currentSlide, nextSlide)
            }
          >
            {teamData &&
              teamData.map((teammember: any, index) => (
                <Card
                  className="team_slider_card overflow-hidden position-relative"
                  key={index}
                >
                  <Row gutter={[16, 0]} justify="center" align="middle">
                    <Col xs={24}>
                      <Image
                        preview={false}
                        src={teammember.image}
                        alt={teammember.name}
                        className="team_slider_card_img"
                      />
                    </Col>
                    <Col xs={24}>
                      <Title level={3}>{teammember.name}</Title>
                    </Col>
                    <Col xs={24}>
                      <Title level={4}>{teammember.title}</Title>
                    </Col>
                    <Col xs={24}>
                      <Text ellipsis>{teammember.details}</Text>
                    </Col>
                    <Col xs={24} className="">
                      <Button
                        block
                        className="team_slider_card_btn"
                        onClick={() => showDrawer(index)}
                        icon={<EyeOutlined />}
                      >
                        View More
                      </Button>
                    </Col>
                  </Row>
                  <Drawer
                    placement="right"
                    closable={true}
                    onClose={onclose}
                    visible={index === visible}
                    getContainer={false}
                    width="100%"
                    style={{ position: "absolute" }}
                  >
                    <p onClick={onclose} className="text-center">
                      {" "}
                      {teammember.details}
                    </p>
                  </Drawer>
                </Card>
              ))}
          </Slider>
        ) : (
          <Slider {...settings} className="team_slider">
            <div className="skeleton">
              <Skeleton.Input active={true} />
            </div>
            <div className="skeleton">
              <Skeleton.Input active={true} />
            </div>
            <div className="skeleton">
              <Skeleton.Input active={true} />
            </div>
            <div className="skeleton">
              <Skeleton.Input active={true} />
            </div>
          </Slider>
        )}
      </div>
    </div>
  );
};
