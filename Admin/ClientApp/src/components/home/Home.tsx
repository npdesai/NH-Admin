import React, { FC } from "react";
import { Carousel } from "./carousel/Carousel";
import { Client } from "./client/Client";
import { Team } from "./team/Team";

export const Home: FC = () => {
  return (
    <div>
      <Carousel></Carousel>
      <Team></Team>
      <Client></Client>
    </div>
  );
};
