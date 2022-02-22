import React, { FC } from "react";
import { Layout } from "antd";
import "./TopNavMenu.scss";

const { Header } = Layout;

export const TopNavMenu: FC = () => {
  return (
    <Header className="admin_layout_fix_header">
      <div className="admin_layout_fix_header_logo">ADMIN</div>
    </Header>
  );
};
