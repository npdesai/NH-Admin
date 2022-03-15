import { Layout } from "antd";
import React, { FC } from "react";
import { useLocation } from "react-router";
import { LeftNavMenu } from "./admin/navmenus/LeftNavMenu";
import { TopNavMenu } from "./admin/navmenus/TopNavMenu";
import { NavMenu } from "./navmenus/NavMenu";

const { Content } = Layout;

export const MainLayout: FC = ({ children }) => {
  const location = useLocation();
  const isLoginScreen = location.pathname.includes("login");
  return (
    <React.Fragment>
      {location.pathname.includes("admin") ? (
        <Layout className="admin_layout">
          {isLoginScreen ? "" : <TopNavMenu />}
          <Layout className={`${isLoginScreen ? "" : "admin_layout_main"}`}>
            {isLoginScreen ? "" : <LeftNavMenu />}
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
