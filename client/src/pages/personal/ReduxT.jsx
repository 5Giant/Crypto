import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { capitalize } from "../../components/utils";
import { CryptoContext } from "../../context/crypto-context";
import { FetchCrypto } from "../../components/api";
import Exchanger from "../../components/Exchanger";
import { percentDiff } from "../../components/utils";
import Test from "../../components/Test";
import SortBar from "../../components/sortbar/SortBar";
import HistoryList from "../../components/historyList/HistoryList";

const contentStyle = {
  minHeight: "85.6vh",
  width: "100%",
  backgroundColor: "#1677ff",
  display: "flex",
};

function heavyComputation(num) {
  for (let i = 0; i <= 1999999999; i++) {}
  return num * 2;
}

export default function ReduxT() {
  const { setSelNote, selNote, balance, setTransHistory, transHistory } =
    useContext(CryptoContext);
  //   const { assets, crypto, cryptoAssets } = useContext(CryptoContext);
  //   useEffect(() => {
  //     FetchCrypto();
  //   }, []);
  //   useEffect(() => {}, [cryptoAssets]);

  //   const sumAssets = crypto
  //     .map((coin) => {
  //       let amount = 0;
  //       let price = 0;
  //       let profit = 0;
  //       assets.map((operation) => {
  //         operation.id === coin.id
  //           ? ((amount += Number(operation.amount)),
  //             (price += Number(operation.amount) * Number(operation.price)),
  //             (profit +=
  //               Number(operation.amount) *
  //               (Number(coin.price) - Number(operation.price))))
  //           : null;
  //       });

  //       return {
  //         id: coin.id,
  //         amount: amount,
  //         totalSpent: price,
  //         totalProfit: profit,
  //         grow: profit > 0,
  //         growPercent: 0,
  //         actualValue: amount * coin.price,
  //       };
  //     })
  //     .filter((coin) => coin.amount > 0)
  //     .map((asset) => {
  //       asset.growPercent = percentDiff(asset.totalSpent, asset.actualValue);

  //       return asset;
  //     });

  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  //   const doubleNumber = heavyComputation(number);
  // const doubleNumber = useMemo(() => heavyComputation(number), [number]);

  //   const themeStyles = {
  //     backgroundColor: dark ? "black" : "white",
  //     color: !dark ? "black" : "white",
  //   };
  const themeStyles = useMemo(
    () => ({
      backgroundColor: dark ? "black" : "white",
      color: !dark ? "black" : "white",
    }),
    [dark]
  );

  useEffect(() => {
    console.log("смена темы");
  }, [themeStyles]);

  // return (
  //   <div
  //     style={{
  //       // margin: "2rem 0 0 5rem",
  //       width: "100%",
  //       display: "flex",
  //       justifyContent: "center",
  //       flexDirection: "column",
  //       // ...themeStyles,
  //     }}
  //   >
  //     <input
  //       style={{ width: "20%", margin: "0 auto" }}
  //       type="number"
  //       value={number}
  //       onChange={(e) => setNumber(parseInt(e.target.value))}
  //     ></input>
  //     <button
  //       style={{ width: "15%", margin: "0 auto" }}
  //       onClick={() => setDark((prev) => !prev)}
  //     >
  //       Change Theme
  //     </button>
  //     <div
  //       style={{
  //         textAlign: "center",
  //         width: "100%",
  //         fontSize: "30px",
  //         marginTop: "10px",
  //         margin: "0 auto",
  //         ...themeStyles,
  //       }}
  //     >
  //       {doubleNumber}
  //     </div>
  //   </div>
  // );
  //     <div style={contentStyle}>
  //       <Test></Test>
  //     </div>
  let a = 0;
  let b = 0;
  const HandleClick1 = () => {
    a++;
    console.log(a);
  };
  const HandleClick2 = useCallback(() => {
    a++;
    console.log(a);
  }, [a]);
  return (
    <>
      <SortBar />
      <HistoryList
        data={{
          data: transHistory.assets,
          sortedBy: transHistory.options.sort,
        }}
      ></HistoryList>
      <button onClick={HandleClick1}>1</button>
      <button onClick={HandleClick2}>2</button>
      <button onClick={HandleClick2}>2</button>
    </>
  );
}
