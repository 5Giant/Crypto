import { Button, Layout } from "antd";
import { useState } from "react";
import AuthForm from "./AuthForm";
import NavBar from "./NavBar";
import BalanceDisplay from "./BalanceDisplay";
import logo from "../res/logo.png";
import Modal from "./modal/Modal";
const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 2,
  width: "100%",
  background: "rgb(234, 242, 255)",
  padding: "0 1rem",
  display: "flex",
  alignItems: "center",
  height: "60px",
  justifyContent: "space-between",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

export default function AppHeader() {
  const [modal, setModal] = useState(false);

  return (
    <Layout.Header style={headerStyle}>
      <img src={logo} style={{ height: "70%" }}></img>
      {/* <div>neBinans</div> */}
      <NavBar />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <BalanceDisplay />
        <AuthForm />
      </div>
      <Modal />
    </Layout.Header>
  );
}
