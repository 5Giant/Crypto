import { Card, InputNumber, Button, Layout, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";
import { useCrypto } from "../../context/crypto-context";
const authStyle = {
  position: "absolute",
  width: "100%",
  height: "100vh",
  zIndex: "100",
  backgroundColor: "black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: "0px",
  left: "0px",
};
const cardStyle = {
  marginTop: "0.5rem",
  textAlign: "center",
  height: "40vh",
  width: "30%",
  backgroundColor: "rgb(248, 249, 250)",
};

export default function RegPage() {
  const { user, setUser } = useCrypto();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  async function handleClick(event) {
    if (event.currentTarget.id === "login") {
      const userData = await userAuth({ login: "admin", password: "12345" });
      console.log(userData.status);
      userData.status === "success" ? setUser(true) : null;
      console.log(user);
    } else {
      console.log("click out");
      setUser(false);
    }
    console.log(login);
  }
  return (
    <div style={authStyle}>
      <Card style={cardStyle}>
        <Input
          style={{ marginRight: "0.5rem" }}
          placeholder="login"
          // onChange={(e) => {
          //   setLogin(e.currentTarget.value);
          // }}
        />
        <Input.Password
          style={{ marginRight: "0.5rem" }}
          // onChange={(e) => {
          //   setPassword(e.currentTarget.value);
          // }}
          placeholder="password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Card>
    </div>
  );
}
