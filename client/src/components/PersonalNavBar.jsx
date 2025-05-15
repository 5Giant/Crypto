import { Link, useLocation } from "react-router-dom";
import { useCrypto } from "../context/crypto-context";
import { useEffect, useState } from "react";
import { Button } from "antd";

const navBarStyle = {
  width: "100%",
  padding: "0.3rem 0 0.3rem 1rem",
  display: "flex",
  gap: "1rem",

  backgroundColor: "#7ab8ff",
};

export default function PersonalNavBar() {
  const { user } = useCrypto();

  const location = useLocation();
  const buttons = [
    { id: 0, text: "Assets", path: "/personal/assets" },
    { id: 1, text: "History", path: "/personal/history" },
    { id: 2, text: "Statistic", path: "/personal/statistic" },
    { id: 3, text: "Redux", path: "/personal/redux" },
  ];

  // console.log(buttons.filter((i) => i.path === location.pathname)[0].id);
  const [activeButton, setActiveButton] = useState(
    buttons.filter((i) => i.path === location.pathname)[0].id
  );

  const handleClick = (index) => {
    setActiveButton(index);
    sessionStorage.setItem("personalBarActiveBtn", activeButton);
  };

  return (
    <div style={navBarStyle}>
      {buttons.map((button) => {
        if (button.protected && !user) return null;

        return (
          <Link to={button.path} key={button.id}>
            <Button
              type={activeButton === button.id ? "primary" : "default"}
              onClick={() => handleClick(button.id)}
            >
              {button.text}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
