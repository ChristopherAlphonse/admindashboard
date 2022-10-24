import React, { useState } from "react";
import "./Sidebar.scss";

import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div
            className="logo"
            style={{ display: isOpen ? "block" : "none" }}
          ></div>

          <div
            className="bars"
            style={{ marginLeft: isOpen ? "180px" : "0px" }}
          >
            <AiOutlineExclamationCircle onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
