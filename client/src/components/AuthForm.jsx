import { Button } from "antd";
import { useState } from "react";
import { useCrypto } from "../context/crypto-context";
import { userAuth } from "./api";
import { Link } from "react-router-dom";

const buttonStyle = {
  marginRight: "0.5rem",
};
const authFormStyle = {
  // width: "25%",
  padding: "0 1rem 0 1rem",
  display: "flex",
  justifyContent: "flex-end",
  madgin: "0",
};

export default function AuthForm() {
  const { user, setUser, setActiveButton, activeButton } = useCrypto();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const buttons = [
    { id: 0, text: "Log In!", path: "login" },
    { id: 1, text: "Sign Up", path: "/", protected: true },
  ];

  async function handleClick(event) {
    if (event.currentTarget.id === "login") {
      const userData = await userAuth({ login: "admin", password: "12345" });
      console.log(userData.status);
      userData.status === "success" ? setUser(true) : null;
      console.log(user);
    } else {
      setUser(false);
      sessionStorage.setItem("user", "0");
    }
    console.log(login);
    setActiveButton(0);
  }

  return (
    <div style={authFormStyle}>
      {!user && (
        <>
          {buttons.map((button) => {
            return (
              <Link to={button.path} key={button.id}>
                <Button style={buttonStyle} type="primary">
                  {button.text}
                </Button>
              </Link>
            );
          })}
        </>
      )}
      {user && (
        <Link to="/">
          <Button
            id="logout"
            // style={{ width: "25%" }}
            onClick={handleClick}
            type="primary"
          >
            Log Out!
          </Button>
        </Link>
      )}
    </div>
  );
}
