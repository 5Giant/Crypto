import { Link } from "react-router-dom";
import { useCrypto } from "../context/crypto-context";
import { Button } from "antd";

const navBarStyle = {
  width: "100%",
  margin: "0 0 0 0",
  display: "flex",
  gap: "0.5rem",
  flex: 1,
  // justifyContent: "center",
};

export default function NavBar() {
  const { user, setActiveButton, activeButton } = useCrypto();
  // const [activeButton, setActiveButton] = useState(0);

  const handleClick = (index) => {
    setActiveButton(index);
  };

  const buttons = [
    { id: 0, text: "Buy Crypto", path: "/" },
    { id: 2, text: "Item2", path: "/" },
    { id: 3, text: "Item3", path: "/" },
    { id: 4, text: "Personal", path: "/personal/assets", protected: true },
    // { id: 2, text: "About", path: "/about" },
  ];

  return (
    <div style={navBarStyle}>
      {buttons.map((button) => {
        if (button.protected && !user) return null;

        return (
          <Link to={button.path} key={button.id}>
            <Button
              size="large"
              color="default"
              variant="text"
              style={{
                color: activeButton === button.id ? "blue" : "black",
                fontSize: "18px",
                fontWeight: "bold",
                height: "100%",
              }}
              // type={activeButton === button.id ? "primary" : ""}
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
