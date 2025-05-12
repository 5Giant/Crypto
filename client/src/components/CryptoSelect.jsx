import { Select, Space } from "antd";
import { useCrypto } from "../context/crypto-context";
import { useEffect, useState } from "react";
import { capitalize } from "./utils";
export default function CryptoSelect() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const { crypto, setSelectedCoin, selectedCoin } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        console.log("/");
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    setModal((prev) => !prev);
    typeof value === "string" ? setSelectedCoin(value) : null;
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Select
      showSearch
      onChange={handleChange}
      onClick={() => setSelect((prev) => !prev)}
      placeholder={capitalize(selectedCoin)}
      onSelect={handleSelect}
      style={{ width: 250 }}
      options={crypto.map((coin) => ({
        label: coin.name,
        value: coin.id,
        emoji: coin.icon,
      }))}
      optionRender={(option) => (
        <Space>
          <img
            style={{ width: "20px" }}
            src={option.data.emoji}
            alt={option.data.label}
          />
          {option.data.label}
        </Space>
      )}
    />
  );
}
