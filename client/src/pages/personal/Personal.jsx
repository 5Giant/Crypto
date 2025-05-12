import { Layout, Card, Statistic, List, Typography, Spin, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { capitalize } from "../../utils";
// import { CryptoContext } from "../../../context/crypto-context";
import { FetchCrypto } from "../../api";
import Exchanger from "../../Content/Exchanger";
import Assets from "./Assets";
import History from "./History";
import PersonalNavBar from "./PersonalNavBar";
import { Route, Routes } from "react-router-dom";
const siderStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  padding: "1rem",
  width: "80%",
};

export default function Personal() {
  //   const { assets, crypto } = useContext(CryptoContext);
  // console.log(assets);
  //   console.log(crypto);
  useEffect(() => {
    FetchCrypto();
  }, []);

  return (
    <>
      <PersonalNavBar />
    </>
  );
}
