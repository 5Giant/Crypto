import { Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useCrypto } from "../context/crypto-context";
const currenSelectStyle = {
  display: "flex",
  justifyContent: "end",
  width: "30%",
  marginRight: "1rem",
};

export default function CurrentSelect() {
  const [select, setSelect] = useState(false);
  const [options, setOptions] = useState([]);
  const { currencyData, setCurrentCurrency, currentCurrency } = useCrypto();

  useEffect(() => {
    if (currencyData.length > 0) {
      setOptions(
        currencyData.map((cur, i) => ({
          label: `${cur[0]} ${cur[2]} ${cur[1]}`,
          value: cur[0],
          name: i,
          price: cur[1],
          symbol: cur[2],
        }))
      );
    }
  }, []);

  const handleChange = (value, options) => {
    console.log("Выбранная валюта:", options.value);
    setCurrentCurrency(currencyData[options.name]);
    console.log(currentCurrency);
  };

  return (
    <div style={currenSelectStyle}>
      <Select
        showSearch
        onChange={handleChange}
        onClick={() => setSelect((prev) => !prev)}
        // open={select}
        style={{ width: 150 }}
        placeholder="USD $"
        options={options}
        optionRender={(option) => (
          <Space>
            {option.data.value} {option.data.symbol} {option.data.price}
          </Space>
        )}
      />
    </div>
  );
}
