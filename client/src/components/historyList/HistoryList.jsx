import { useCrypto } from "../../context/crypto-context";
import { capitalize } from "../utils";
import { Spin } from "antd";
import "./styles.css";
import { useCallback, useEffect, useState } from "react";

export default function HistoryList(data) {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 500);
  }, []);

  return (
    <>
      {!isReady && (
        <div style={{ height: "500px" }}>
          <Spin size="large" className="custom-spin history-spin"></Spin>
        </div>
      )}
      {isReady &&
        data.data.data.map(
          (asset, index) => (
            (asset = {
              ...asset,
              pattern: data.data.sortedBy,
            }),
            (<Note key={index} data={asset} />)
          )
        )}
    </>
  );
}

function Note(data) {
  const { crypto, setSelNote, selNote, transHistory } = useCrypto();
  data = data.data;

  if (data === undefined || crypto.length === 0) {
    return null;
  }
  let savedSelNote;
  JSON.parse(sessionStorage.getItem("selNote")).selNote
    ? (savedSelNote = JSON.parse(sessionStorage.getItem("selNote")))
    : (savedSelNote = selNote);

  const icon = crypto.find((c) => c.id === data.id)?.icon;
  const date = new Date(data.date);
  const day = date.getDate();
  const month = date.toLocaleString("en-EN", { month: "long" });
  const year = date.getFullYear();
  const time = date.toLocaleTimeString("ru-RU");
  const formattedDate = `${day} ${month} ${year} ${time}`;

  const classSelect = (value) => {
    return `${value} text-item ${data.selected ? "selected-item" : "item"} ${
      data.pattern === value ? "border-selected" : ""
    }`;
  };

  const HandleClick = (event) => {
    const newSelNote = {
      ...savedSelNote,
      selNote: event.currentTarget.id ? 10000 : data.date,
    };
    setSelNote(newSelNote);
    sessionStorage.setItem("selNote", JSON.stringify(newSelNote));
  };
  //   [selNote, transHistory.options]
  // );

  return data.id === "payment" ? (
    <div
      // id={data.selected ? "selected" : null}
      onClick={HandleClick}
      className="note-container"
    >
      <div className="payment payment-item">
        Payment: {data.amount.toLocaleString("en-US")}$
      </div>
      <div className="date payment-item">{formattedDate}</div>
    </div>
  ) : (
    <div
      id={data.selected ? "selected" : null}
      onClick={HandleClick}
      className="note-container"
    >
      <div className={classSelect("coin")}>
        <img style={{ height: "100%" }} src={icon}></img>
        <div>{capitalize(data.id)}</div>
      </div>
      <div className={classSelect("amount")}>{data.amount} </div>
      <div className={classSelect("price")}>
        {data.price > 1
          ? Math.round(data.price).toLocaleString("en-US")
          : data.price.toLocaleString("en-US")}
        $
      </div>
      <div className={classSelect("total")}>
        {data.price > 1
          ? Math.round(data.price * data.amount).toLocaleString("en-US")
          : (data.price * data.amount).toLocaleString("en-US")}
        $
      </div>
      <div className={classSelect("date")}>{formattedDate}</div>
    </div>
  );
}
