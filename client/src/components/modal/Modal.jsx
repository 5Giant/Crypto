import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCrypto } from "../../context/crypto-context";
import { Button, Input, Modal } from "antd";
import PaymentForm from "../CardForm";
import "./styles.css";

const modalStyle = {
  height: "200px",
  width: "400px",
  margin: "5rem auto",
  padding: "0rem",
  border: "0px solid black",
  borderRadius: "10px",
  zIndex: 100,
};

const cardStyle = {
  margin: "0",
  width: "100%",
  height: "100%",
  padding: "0", // внутренний отступ
  // padding: "0 0 0 0",
  // margin: "0 0 0 0",
  textAlign: "center",
  border: "none",
  backgroundColor: "rgb(255, 255, 255)",
  // boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

export default function ModalPay(data) {
  const { modal, setModal } = useCrypto();
  const [paymentForm, setPaymentForm] = useState(false);
  const [amount, setAmount] = useState(0);
  const inpRef = useRef();
  useEffect(() => {}, [modal]);

  function handleOffClick() {
    setPaymentForm(false);
    setModal([false, 0]);
  }

  function handleClick() {
    if (!amount || amount === "0") {
      inpRef.current.style.backgroundColor = "red";
      console.log(inpRef.current);
      return;
    }
    setModal([true, amount]);
    setPaymentForm(true);
  }
  function handleChange(event) {
    // payment = event.currentTarget.value;
    setAmount(event.currentTarget.value);
    // console.log(payment);
  }
  function onPaymentClick(event) {
    setAmount(event.currentTarget.dataset.payment);
  }

  useEffect(() => {
    if (modal[1] === false) {
      setPaymentForm(false);
    }
    setAmount();
  }, [modal]);

  // useEffect(() => {
  //   inpRef.current?.focus();
  //   console.log("focus");
  // }, [modal[0]]);
  return createPortal(
    <>
      {/* <Modal>123455</Modal> */}
      <Modal
        afterOpenChange={(opened) => {
          if (opened) inpRef.current?.focus();
        }}
        styles={{
          body: { padding: "15px" }, // Тело модалки
        }}
        onCancel={handleOffClick}
        footer={null}
        mask="true"
        className="modal"
        open={modal[0]}
      >
        {!paymentForm && (
          <div style={{ width: "auto" }}>
            {/* <Card title="Balance Recharge Form" style={cardStyle}> */}
            <div
              style={{
                textAlign: "center",
                width: "100%",
                margin: "1.5rem 0  1.5rem 0",
                fontSize: "16px",
              }}
            >
              Payment Amount
            </div>
            <div style={{ marginBottom: "0.3rem" }}>
              <Input
                value={amount}
                ref={inpRef}
                addonAfter="$"
                placeholder={modal[1]}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <Button
                style={{ marginRight: "0.3rem" }}
                onClick={onPaymentClick}
                data-payment="100"
                size="small"
              >
                100$
              </Button>
              <Button
                style={{ marginRight: "0.3rem" }}
                onClick={onPaymentClick}
                data-payment="500"
                size="small"
              >
                500$
              </Button>
              <Button
                style={{ marginRight: "0.3rem" }}
                onClick={onPaymentClick}
                data-payment="1000"
                size="small"
              >
                1000$
              </Button>
              {modal[1] > 0 && (
                <Button
                  style={{ marginRight: "0.3rem" }}
                  onClick={onPaymentClick}
                  data-payment={modal[1]}
                  size="small"
                >
                  {modal[1]}$
                </Button>
              )}
            </div>
            <Button
              type="primary"
              onClick={handleClick}
              style={{ width: "20%", margin: "0 40% 0 40%" }}
            >
              Top Up
            </Button>

            {/* </Card> */}
          </div>
        )}
        {paymentForm && <PaymentForm></PaymentForm>}
      </Modal>
    </>,
    document.getElementById("modal")
  );
}
