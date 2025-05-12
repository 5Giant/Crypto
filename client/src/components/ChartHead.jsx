import CurrentSelect from "./CurrentSelect";
import { useCrypto } from "../context/crypto-context";
import { percentDiff } from "./utils";

const charHeadStyle = {
  height: "60px",
  width: "100%",
  margin: "0.3rem 0 0 0",
  display: "flex",
};
const pStyle = {
  fontSize: "40px",
  margin: "0 0 0 0",
  padding: "0 0 0 0",
};
const imgStyle = { height: "60px", aspectRatio: "1/1" };
const noteStyle = {
  marginLeft: `calc(${imgStyle.height} + 0.3rem)`,
  paddingLeft: pStyle.paddingLeft,
  fontSize: "25px",
  marginBottom: "10px",
  display: "flex",
};
const tagStyle = {
  color: "",
  fontSize: "20px",
  marginLeft: "0.5rem",
};
const interval = {
  inteval: [1, 7, 30, 90, 365],
  symbol: ["1D", "7D", "1M", "3M", "1Y"],
};

export default function ChartHead(coin) {
  // https://api.frankfurter.app/latest?from=USD
  const { currentCurrency, historyData } = useCrypto();
  if (historyData === undefined) {
    return;
  }

  if (historyData.data.length === 0) {
    return;
  }
  const percent = {
    percent: percentDiff(
      historyData.data[0].price,
      historyData.data[historyData.data.length - 1].price
    ),
    sign: true,
  };
  // percent.sign ? (tagStyle.color = "green") : (tagStyle.color = "red");
  let symbol;
  // if (historyData.interval === undefined) {
  //   return null;
  // }

  interval.inteval.map((c, index) => {
    if (c === historyData.interval) {
      symbol = interval.symbol[index];
    }
  });

  // const symbol = interval1.interval.find((c, index) => {
  //   c === historyData.interval;
  //   return index;
  // });
  // console.log(symbol);
  historyData.data[0].price >
  historyData.data[historyData.data.length - 1].price
    ? (percent.sign = false)
    : (percent.sign = true);
  coin = coin.coin;
  return (
    <>
      <div style={charHeadStyle}>
        <div style={{ width: "90%", alignItems: "center" }}>
          <div
            style={{
              height: "60px",
              padding: "0 0 0 0.5rem",
              width: "100%",
              display: "flex",
            }}
          >
            <img src={coin.icon} style={imgStyle}></img>
            <p style={pStyle}>
              {coin.name} Price ({coin.symbol})
            </p>
          </div>
        </div>

        <CurrentSelect></CurrentSelect>
      </div>
      <div style={noteStyle}>
        {coin.symbol} to {currentCurrency[0]}: 1 {coin.name} equals{" "}
        {currentCurrency[2]}
        {(coin.price * currentCurrency[1]).toLocaleString("en-US")}
        {currentCurrency[0]}{" "}
        <div
          style={{
            color: percent.sign ? "green" : "red",
            fontSize: "20px",
            marginLeft: "0.5rem",
          }}
        >
          {percent.sign ? "+" : "-"}
          {percent.percent}
          {"% "}
          {symbol}
        </div>
      </div>
    </>
  );
}
