import Footer from "../footer/Footer";
import Header from "../header/Header";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "80vh" }} className="--pad">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
