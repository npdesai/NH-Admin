import { AppstoreOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { navigate } from "../../../common/navigation";
import { AdminRoutesConstant } from "../../../routes/AdminRoutes";
import "./LeftNavMenu.scss";

const { Sider } = Layout;

export const LeftNavMenu: FC = () => {
  const location = useLocation();
  const history = useHistory();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const onCollapse = (collapsed: any) => {
    setIsCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={isCollapsed} onCollapse={onCollapse} theme="light">
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname.split("/")[2]]}
      >
        <Menu.Item
          key="carousel"
          icon={<AppstoreOutlined />}
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
