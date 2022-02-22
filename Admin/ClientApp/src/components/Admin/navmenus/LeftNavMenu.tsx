import { Layout, Menu } from "antd";
import React, { FC } from "react";

const { Sider } = Layout;

export const LeftNavMenu: FC = () => {
  return (
    <Sider width={200} className="left_menu">
      <Menu mode="inline">
        <Menu.Item key="1">Menu1</Menu.Item>
        <Menu.Item key="2">Menu2</Menu.Item>
        <Menu.Item key="3">Menu3</Menu.Item>
        <Menu.Item key="4">Menu4</Menu.Item>
        <Menu.Item key="5">Menu5</Menu.Item>
      </Menu>
    </Sider>
  );
};
