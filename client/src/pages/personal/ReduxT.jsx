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

export default function ReduxT() {
  const { setSelNote, selNote, balance, setTransHistory, transHistory } =
    useContext(CryptoContext);

  return (
    <>
      {/* <SortBar />
      <HistoryList
        data={{
          data: transHistory.assets,
          sortedBy: transHistory.options.sort,
        }}
      ></HistoryList> */}
      <button onClick={HandleClick1}>1</button>
      <button onClick={HandleClick2}>2</button>
      <button onClick={HandleClick2}>2</button>
    </>
  );
}
