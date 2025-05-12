import {
  Space,
  Layout,
  Card,
  Statistic,
  List,
  Typography,
  Spin,
  Tag,
  Select,
} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { capitalize } from "../../components/utils";
import { CryptoContext } from "../../context/crypto-context";
import { FetchCrypto } from "../../components/api";
import Exchanger from "../../components/Exchanger";
import { percentDiff } from "../../components/utils";

const contentStyle = {
  minHeight: "85.6vh",
  width: "100%",
  backgroundColor: "#ffffffbc",
  display: "flex",
};

const assetsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5rem 1.5rem", // row-gap column-gap
  padding: "1rem",
  // width: "100%",
  alignContent: "flex-start",
  width: "75%",
};

const cardStyle = {
  width: "23%",
  // marginBottom: "1rem",
  height: "30vh",
  boxSizing: "border-box",
  border: "1px solid #b3d1ff",

  backgroundColor: "#e6f0ff",
};

const exchangerStyle = {
  containerStyle: { width: "25%" },
  cardStyle: "#E6F0FF",
};

export default function Assets() {
  const { assets, crypto, cryptoAssets } = useContext(CryptoContext);
  useEffect(() => {
    FetchCrypto();
  }, []);
  useEffect(() => {}, [cryptoAssets]);

  const sumAssets = crypto
    .map((coin) => {
      let amount = 0;
      let price = 0;
      let profit = 0;
      assets.map((operation) => {
        operation.id === coin.id
          ? ((amount += Number(operation.amount)),
            (price += Number(operation.amount) * Number(operation.price)),
            (profit +=
              Number(operation.amount) *
              (Number(coin.price) - Number(operation.price))))
          : null;
      });

      return {
        id: coin.id,
        amount: amount,
        totalSpent: price,
        totalProfit: profit,
        grow: profit > 0,
        growPercent: 0,
        actualValue: amount * coin.price,
      };
    })
    .filter((coin) => coin.amount > 0)
    .map((asset) => {
      asset.growPercent = percentDiff(asset.totalSpent, asset.actualValue);

      return asset;
    });

  // sumAssets.map(
  //   (asset) => {(asset.growPercent = percentDiff(totalSpent, totalProfit))}
  // );
  // console.log(sumAssets);
  // console.log(assets);
  console.log("------------------------");
  return (
    <div style={contentStyle}>
      <div style={assetsStyle}>
        {sumAssets.map((asset, index) => (
          <Card key={index} style={cardStyle}>
            {/* {console.log(asset)} */}
            <Statistic
              title={capitalize(asset.id)}
              value={asset.actualValue}
              precision={2}
              valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              size="small"
              dataSource={[
                {
                  title: "Profit:",
                  value: asset.totalProfit,
                  isPlain: false,
                  withTag: true,
                },
                {
                  title: "Amount:",
                  value: asset.amount.toFixed(2).toLocaleString("en-US"),
                  isPlain: true,
                },
                {
                  title: "Spent:",
                  value:
                    asset.totalSpent.toFixed(2).toLocaleString("en-US") + "$",
                  isPlain: true,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>

                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {item.isPlain && item.value}

                    {!item.isPlain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </div>
      <Exchanger exData={exchangerStyle} />
    </div>
  );
}
