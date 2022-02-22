import { Layout } from "antd";
import React, { FC } from "react";
import { useLocation } from "react-router";
import { LeftNavMenu } from "./Admin/navmenus/LeftNavMenu";
import { TopNavMenu } from "./Admin/navmenus/TopNavMenu";
import { NavMenu } from "./navmenus/NavMenu";

const { Content } = Layout;

export const MainLayout: FC = ({ children }) => {
  const location = useLocation();

  return (
    <React.Fragment>
      {location.pathname.includes("admin") ? (
        <Layout className="admin_layout">
          <TopNavMenu />
          <Layout className="admin_layout_main">
            <LeftNavMenu />
            <Layout className="admin_layout_content">
              <Content>{children}</Content>
            </Layout>
          </Layout>
        </Layout>
      ) : (
        <Layout className="user_layout">
          <NavMenu />
          <Layout className="user_layout_main">
            <Layout className="user_layout_content">
              <Content>{children}</Content>
            </Layout>
          </Layout>
        </Layout>
      )}
    </React.Fragment>
  );
};