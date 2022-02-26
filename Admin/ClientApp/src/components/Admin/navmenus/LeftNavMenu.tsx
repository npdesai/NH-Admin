import { Layout, Menu } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { navigate } from "../../../common/navigation";
import { AdminRoutesConstant } from "../../../routes/AdminRoutes";

const { Sider } = Layout;

export const LeftNavMenu: FC = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Sider width={200} className="left_menu">
      <Menu mode="inline" defaultSelectedKeys={[location.pathname.split("/")[2]]}>
        <Menu.Item
          key="carousel"
          onClick={() =>
            navigate(history, AdminRoutesConstant.AdminPages.CarouselList.path)
          }
        >
          Carousel
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
