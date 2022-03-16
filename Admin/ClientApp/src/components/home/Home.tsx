import React, { FC } from "react";
import { CarouselSlider } from "./carousel/CarouselSlider";
import { Client } from "./client/Client";
import { Team } from "./team/Team";

export const Home: FC = () => {
  return (
    <div>
      <CarouselSlider></CarouselSlider>
      <Team></Team>
      <Client></Client>
    </div>
  );
};
