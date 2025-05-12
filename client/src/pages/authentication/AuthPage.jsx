import { Card, InputNumber, Button, Layout, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import { useCrypto } from "../../context/crypto-context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const authStyle = {
  position: "absolute",
  width: "100%",
  height: "100vh",
  zIndex: "100",
  backgroundColor: "rgb(124, 162, 201)",
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
  width: "100%",
  backgroundColor: "rgb(248, 249, 250)",
};
const offBtnStyle = {
  zIndex: 100,
  height: "5%",
  width: "10%",
  margin: "0",
  padding: "3px",
  position: "relative",
  top: "37px",
  left: "87%",
};
const inputStyle = { margin: "0.5rem 0 1rem 0" };

export default function AuthPage() {
  const { user, setUser, setActiveButton } = useCrypto();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const button = { id: 0, text: "Log In!", path: "/personal" };
  const navigate = useNavigate();
  const loginInput = useRef();
  async function handleClick(event) {
    // if (event.currentTarget.id === "login") {
    //   const userData = await userAuth({ login: "admin", password: "12345" });
    //   console.log(userData.status);
    //   userData.status === "success" ? setUser(true) : null;
    //   console.log(user);
    // } else {
    //   console.log("click out");
    //   setUser(false);
    // }

    setUser(true);
    sessionStorage.setItem("user", "1");
    setActiveButton(4);
    console.log(login);
  }
  useEffect(() => {
    loginInput.current?.focus();
  }, []);

  return (
    <div style={authStyle}>
      <div style={{ width: "25%" }}>
        <Button
          type="primary"
          onClick={() => {
            navigate("/");
          }}
          style={offBtnStyle}
        >
          X
        </Button>
        <Card style={cardStyle} title="Log In">
          <div style={{ textAlign: "start" }}>Email/Phone number</div>
          <Input
            ref={loginInput}
            style={inputStyle}
            placeholder="Email/Phone number"
          />
          <div style={{ textAlign: "start" }}>Password</div>
          <Input.Password
            style={inputStyle}
            // onChange={(e) => {
            //   setPassword(e.currentTarget.value);
            // }}
            placeholder="password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />

          <Link to={button.path} key={button.id}>
            <Button type="primary" onClick={() => handleClick()}>
              {button.text}
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
