import { useCrypto } from "../context/crypto-context";
import { useRef, useEffect, useState } from "react";
import { Card, InputNumber, Button, Layout, Form } from "antd";
import CryptoSelect from "./CryptoSelect";
import imgArrows from "../res/Arrows.png";
import LabeledBorderInput from "./Input/NewInput";
import { useNavigate } from "react-router-dom";
export default function Exchanger(data) {
  const {
    setModal,
    balance,
    setBalance,
    assets,
    crypto,
    selectedCoin,
    setSelectedCoin,
    currentCurrency,
    cryptoAssets,
    user,
    setCryptoAssets,
    setSelNote,
  } = useCrypto();
  // const exchangerStyle = {
  //   width: "30%",
  // };
  const navigate = useNavigate();
  const [Prise, SetPrise] = useState({ dollar: 1, crypto: 1 });
  // console.log(crypto.length);
  const coin = crypto.find((c) => c.id === selectedCoin);

  useEffect(() => {
    typeof coin === "object"
      ? SetPrise({ dollar: coin.price * currentCurrency[1], crypto: 1 })
      : null;
  }, [coin, currentCurrency]);

  function handleClick() {
    console.log("Price.crypto: " + Prise.crypto + " coin.price: " + coin.price);
    const price = Number(Prise.crypto) * Number(coin.price);
    console.log("price: " + price);
    if (balance > Prise.crypto * coin.price) {
      const asset = {
        id: coin.id,
        amount: Prise.crypto,
        price: coin.price,
        date: Date.now(),
      };
      console.log("asset.price" + asset.price);
      setCryptoAssets((prevAssets) => [...prevAssets]);

      const data = JSON.parse(sessionStorage.getItem("assets"));
      // console.log(data);
      data.push(asset);
      // console.log(data[data.length - 1]);
      sessionStorage.setItem("assets", JSON.stringify(data));
      // console.log(
      //   JSON.parse(sessionStorage.getItem("assets"))[data.length - 1]
      // );
      // console.log(data[data.length - 1]);
      setSelNote((prev) => ({ ...prev, selNote: data[data.length - 1].date }));
      setBalance((prev) => prev - Prise.crypto * coin.price);
      // setSelNote((prev) => ({ ...prev, selNote: 0 }));
    } else {
      if (!user) {
        navigate("login");
        return;
      }
      console.log("mala");
      const payment = Math.round(Prise.crypto * coin.price - balance) + 1;
      setModal([true, payment]);
    }
  }

  function handleChange(e, id) {
    // console.log(e.target.value[e.target.value.length - 1]);
    // e.target.value[e.target.value.length - 1] === "."
    //   ? (e.target.value = e.target.value + "0")
    //   : null;
    // console.log(e.target.value);
    // if (typeof e.target.value === "Number") {

    if (e.target.value === "" || /^\d*\.?\d{0,2}$/.test(e.target.value)) {
      const value = Number(e.target.value);

      if (id === "priceCrypto") {
        SetPrise({
          dollar: value * (coin.price * currentCurrency[1]),
          crypto: e.target.value,
        });
      } else {
        SetPrise({
          dollar: value,
          crypto: value / (coin.price * currentCurrency[1]).toFixed(3),
        });
      }
      // }
    }
  }
  if (crypto.length < 3) {
    return null;
  }
  return (
    <div style={data.exData.containerStyle}>
      <Card
        title={<CryptoSelect />}
        style={{
          padding: "0 0 0 0",
          margin: "0.5rem 5% 0 5%",
          textAlign: "center",
          width: "90%",
          backgroundColor: data.exData.cardStyle,
        }}
      >
        <div>Bye {coin.symbol}</div>
        <div style={{ marginBottom: "1rem" }}>
          <LabeledBorderInput
            label="You Buy:"
            id="priceCrypto"
            onChange={(e) => handleChange(e, "priceCrypto")}
            value={Prise.crypto}
            symbol={coin.icon}
          />{" "}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <img src={imgArrows} alt="none" style={{ width: "20px" }} />1{" "}
          {coin.symbol}≈ {(coin.price * currentCurrency[1]).toFixed(3)}
          {currentCurrency[2]}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <LabeledBorderInput
            label="You Spent:"
            id="priceDollar"
            onChange={(value) => handleChange(value, "priceDollar")}
            value={Number(Prise.dollar.toFixed(2))}
            symbol={currentCurrency[2]}
          />
        </div>

        <Button type="primary" onClick={handleClick}>
          Buy
        </Button>
      </Card>
    </div>
  );
}

{
  /* <InputNumber
          addonBefore="You Buy:"
          id="priceCrypto"
          onChange={(value) => handleChange(value, "priceCrypto")}
          value={Number(Prise.crypto).toFixed(3)}
          step={0.1}
          defaultValue={1}
          addonAfter={
            <img src={coin.icon} alt="none" style={{ width: "20px" }} />
          }
        /> */
}
