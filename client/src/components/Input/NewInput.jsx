import React from "react";
import "./styles.css";

export default function LabeledBorderInput({ label, ...props }) {
  return (
    <div className="labeled-input-wrapper">
      <input type="text" className="custom-native-input" {...props} />
      <span className="input-label">{label}</span>

      {!(props.symbol === undefined) && props.symbol.length > 5 && (
        <img className="input-img" src={props.symbol}></img>
      )}

      {!(props.symbol === undefined) && props.symbol.length < 5 && (
        <span className="input-symbol">{props.symbol}</span>
      )}
    </div>
  );
}
