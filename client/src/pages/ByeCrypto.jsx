import Chart from "../components/Chart";
import { useCrypto } from "../context/crypto-context";
import HistoryNavBar from "../components/HistoryNavBar";
import Exchanger from "../components/Exchanger";
import ChartHead from "../components/ChartHead";

const contentStyle = {
  display: "flex",
  width: "80%",
  margin: "0 10% 0 10%",
  padding: "0.5rem 0 0 0",
  backgroundColor: "rgb(255, 255, 255)",
};
const exchangerStyle = {
  containerStyle: { width: "30%" },
  cardStyle: "white",
};
const chartStyle = { width: "70%" };

export default function ByeCrypto() {
  const { crypto, selectedCoin } = useCrypto();
  const coin = crypto.find((c) => c.id === selectedCoin);
  if (!coin) {
    return null;
  }
  return (
    <div style={contentStyle}>
      <div style={chartStyle}>
        <ChartHead coin={coin}></ChartHead>
        <HistoryNavBar></HistoryNavBar>
        <Chart></Chart>
      </div>
      <Exchanger exData={exchangerStyle}></Exchanger>
    </div>
  );
}
