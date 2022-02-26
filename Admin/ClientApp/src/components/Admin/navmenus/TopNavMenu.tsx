import React, { FC } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { cookieName, removeCookie } from "../../../common/cookie";
import { navigate } from "../../../common/navigation";
import { useHistory } from "react-router";
import { AdminRoutesConstant } from "../../../routes/AdminRoutes";
import "./TopNavMenu.scss";

const { SubMenu } = Menu;
const { Header } = Layout;

export const TopNavMenu: FC = () => {
  const history = useHistory();

  const logout = () => {
    removeCookie(cookieName);
    navigate(history, AdminRoutesConstant.AdminLogin.Login.path);
  };

  return (
    <Header className="admin_layout_fix_header">
      <div className="admin_layout_fix_header_logo">ADMIN</div>
      <Menu mode="horizontal" className="admin_layout_fix_header_menu">
        <SubMenu
          key="sub"
          title={
            <span>
              <UserOutlined />
              &nbsp; Admin
            </span>
          }
        >
          <Menu.Item key="1" onClick={logout}>
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};
