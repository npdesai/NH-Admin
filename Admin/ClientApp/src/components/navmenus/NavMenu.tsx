import React, { FC, useState } from "react";
import { Layout } from "antd";
import "./NavMenu.scss";

const { Header } = Layout;

export const NavMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Header className="user_layout_fix_header">
      <div className="user_layout_fix_header_logo">USER</div>
    </Header>
  );
};
