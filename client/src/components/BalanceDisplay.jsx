import { useCrypto } from "../context/crypto-context";
const balanceStyle = {
  borderRadius: "10px",
  color: "#389e0d",
  background: "#f6ffed",

  border: "1px solid #b7eb8f",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  fontSize: "16px",
  lineHeight: "1",
  padding: "5px 5px",
  fontFamily: "monospace",
  fontWeight: "bold",
};
export default function BalanceDisplay() {
  const { user, balance, setModal, currentCurrency } = useCrypto();

  function handleClick() {
    setModal([true, 0]);
    console.log("click");
  }

  return user ? (
    <div onClick={handleClick} style={balanceStyle}>
      {(balance * currentCurrency[1]).toLocaleString("en-US", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
      {currentCurrency[2]}
    </div>
  ) : null;
}
