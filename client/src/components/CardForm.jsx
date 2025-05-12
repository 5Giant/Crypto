import React, { useState, useRef, useEffect } from "react";
import { Form, Input, Button, Space, Divider, Card, Typography } from "antd";
import {
  CreditCardOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useCrypto } from "../context/crypto-context";
const { Text } = Typography;
const cardStyle = {
  padding: "0 0 0 0",
  margin: "0 0 0 0",
  textAlign: "center",
  width: "90%",
  border: "none",
  backgroundColor: "rgb(255, 255, 255)",
};

const PaymentForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const {
    modal,
    setModal,
    setBalance,
    currentCurrency,
    assets,
    setCryptoAssets,
  } = useCrypto();
  const inpRef = useRef();

  const onFinish = (values) => {
    setLoading(true);
    // console.log("Payment data:", values);
    // Здесь API-запрос для оплаты
    setTimeout(() => {
      setLoading(false);
      alert("Оплата прошла успешно!");
    }, 1500);
  };

  function handleClick() {
    const asset = {
      id: "payment",
      amount: Number(modal[1]),
      price: 1,
      date: Date.now(),
      currency: "$",
    };

    setCryptoAssets((prevAssets) => [...prevAssets]);
    const data = JSON.parse(sessionStorage.getItem("assets"));

    data.push(asset);
    // console.log(data[data.length - 1]);
    sessionStorage.setItem("assets", JSON.stringify(data));

    setBalance((prev) => Number(prev) + Number(modal[1]));
    setModal([0, false]);
  }
  useEffect(() => {
    inpRef.current?.focus();
  }, []);
  return (
    <Card
      styles={cardStyle}
      title={
        <Space>
          <CreditCardOutlined style={{ color: "#1890ff" }} />
          <Text strong>Card Payment</Text>
        </Space>
      }
      bordered={false}
      style={{
        maxWidth: 500,
        border: "2px solid white",
        // boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Номер карты с маской и иконкой */}
        <Form.Item
          name="cardNumber"
          label="Card Number"
          rules={[
            { required: true, message: "Введите номер карты" },
            { pattern: /^[\d\s]{16,19}$/, message: "Неверный формат" },
          ]}
        >
          <Input
            ref={inpRef}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            addonBefore={<CreditCardOutlined />}
            onChange={(e) => {
              // Автоматическое добавление пробелов (маска)
              const value = e.target.value
                .replace(/\s/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim();
              form.setFieldsValue({ cardNumber: value });
            }}
          />
        </Form.Item>

        <Space direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name="expiry"
            label="Expiration"
            rules={[
              { required: true, message: "Укажите срок" },
              { pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: "MM/YY" },
            ]}
            style={{ width: "50%" }}
          >
            <Input placeholder="MM/YY" maxLength={5} />
          </Form.Item>

          <Form.Item
            name="cvv"
            label="CVV/CVC"
            rules={[
              { required: true, message: "Введите CVV" },
              { pattern: /^\d{3,4}$/, message: "3-4 цифры" },
            ]}
            style={{ width: "50%" }}
          >
            <Input.Password
              placeholder="•••"
              maxLength={4}
              iconRender={(visible) =>
                visible ? <LockOutlined /> : <LockOutlined />
              }
            />
          </Form.Item>
        </Space>

        <Form.Item
          name="cardHolder"
          label="Cardholder Name"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input
            placeholder="IVAN IVANOV"
            addonBefore={<UserOutlined />}
            style={{ textTransform: "uppercase" }}
          />
        </Form.Item>

        <Divider />

        <Form.Item>
          <Button
            onClick={handleClick}
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
          >
            Pay {modal[1]}
            {currentCurrency[2]}
          </Button>
        </Form.Item>

        {/* <Text
          type="secondary"
          style={{ display: "block", textAlign: "center" }}
        >
          <LockOutlined /> Secured with SSL encryption
        </Text> */}
      </Form>
    </Card>
  );
};

export default PaymentForm;
