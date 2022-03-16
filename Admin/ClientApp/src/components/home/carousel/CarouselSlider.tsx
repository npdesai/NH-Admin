import React, { FC, useEffect, useState } from "react";
import { CarouselClient } from "../../../clients/api.generated.clients";
import Carousel from "react-bootstrap/Carousel";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Skeleton } from "antd";
import "./CarouselSlider.scss";

export const CarouselSlider: FC = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    new CarouselClient()
      .getCarousels(true)
      .then((response) => {
        let carouselTableData: any = [];
        response.data &&
          response.data.map((carousel) => {
            carouselTableData.push({
              title: carousel.title,
              description: carousel.description,
              image: carousel.image,
            });
          });
        setCarouselData(carouselTableData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      {carouselData.length > 0 ? (
        <Carousel controls={false}>
          {carouselData.map((ele: any, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={ele.image}
                alt={ele.title}
                height={550}
              />
              <Carousel.Caption>
                <h3 className="text-light">{ele.title}</h3>
                <p>{ele.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Skeleton.Input active={true} />
      )}
    </div>
  );
};
