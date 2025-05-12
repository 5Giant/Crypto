import { useCrypto } from "../context/crypto-context";
import { useState } from "react";
import { Button } from "antd";

const navBarStyle = {
  paddingLeft: "0.5rem",
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  // border: "1px solid black",
};
const buttonStyle = {
  height: "20px",
  width: "25px",
  fontSize: "15px",
};
export default function HistoryNavBar() {
  const { historyData, setHistoryData } = useCrypto();
  const [selectedButton, setSelectedButton] = useState([
    "link",
    "solid",
    "link",
    "link",
    "link",
  ]);

  function handleClick(event) {
    const interval = Number(event.currentTarget.dataset.interval);
    const selected = event.currentTarget.id;
    setHistoryData((prevHistoryData) => ({
      ...prevHistoryData,
      interval: interval,
    }));

    setSelectedButton(["link", "link", "link", "link", "link"]);
    setSelectedButton((prev) => {
      const newState = [...prev];
      newState[Number(selected)] = "solid";
      return newState;
    });

    console.log(1);
    console.log(historyData);
  }
  let variant = selectedButton;
  return (
    <div style={navBarStyle}>
      <Button
        style={buttonStyle}
        color="primary"
        id="0"
        onClick={handleClick}
        variant={variant[0]}
        data-interval="1"
        height="10px"
      >
        1D
      </Button>
      <Button
        style={buttonStyle}
        color="primary"
        id="1"
        onClick={handleClick}
        variant={variant[1]}
        data-interval="7"
      >
        7D
      </Button>
      <Button
        style={buttonStyle}
        color="primary"
        id="2"
        onClick={handleClick}
        variant={variant[2]}
        data-interval="30"
      >
        1M
      </Button>
      <Button
        style={buttonStyle}
        color="primary"
        id="3"
        onClick={handleClick}
        variant={variant[3]}
        data-interval="90"
      >
        3M
      </Button>
      <Button
        style={buttonStyle}
        color="primary"
        id="4"
        onClick={handleClick}
        variant={variant[4]}
        data-interval="365"
      >
        1Y
      </Button>
    </div>
  );
}
