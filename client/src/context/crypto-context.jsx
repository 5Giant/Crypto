import { createContext, useState, useEffect, useContext } from "react";
import { fakeFetchCrypto, fetchAssets } from "../components/api";
import { percentDiff } from "../components/utils";
import { dateFormat } from "../components/utils";
import { FetchCrypto, fetcCurrency } from "../components/api";

export const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
  selectedCoin: "bitcoin",
  setSelectedCoin: () => {},
  historyData: {},
  setHistoryData: () => {},
  currencyData: [],
  currentCurrency: [],
  setCurrentCurrency: () => {},
  user: [],
  setUser: () => {},
  cryptoAssets: [],
  setCryptoAssets: () => {},
  setActiveButton: () => {},
  activeButton: [],
  balance: [],
  setBalance: () => {},
  modal: [],
  setModal: () => {},
  setSelNote: () => {},
  selNote: {},
  setTransHistory: () => {},
  transHistory: {},
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  const [historyData, setHistoryData] = useState({ data: [], interval: 7 });
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [currencyData, setCurrencyData] = useState();
  const [currentCurrency, setCurrentCurrency] = useState(["USD", 1, "$"]);
  const [user, setUser] = useState(false);
  const [activeButton, setActiveButton] = useState(0);
  const [balance, setBalance] = useState(100000);
  const [modal, setModal] = useState([false, 0]);
  const [selNote, setSelNote] = useState({ selNote: 0, scroll: false });
  const [transHistory, setTransHistory] = useState({
    assets: [],
    options: {},
    selected: {},
  });

  if (!sessionStorage.getItem("balance")) {
    sessionStorage.setItem("balance", balance);
  }

  useEffect(() => {
    if (balance === 100000) {
      setBalance(Number(sessionStorage.getItem("balance")));
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("balance")) {
      sessionStorage.setItem("balance", balance);
      console.log("set");
    }
  }, [balance]);

  useEffect(() => {
    JSON.parse(sessionStorage.getItem("user")) === "0"
      ? setUser(false)
      : setUser(true);
  }, []);

  let dataAssets = [
    {
      id: "payment",
      amount: 43391.66,
      price: 1,
      date: 1737810110199,
      currency: "$",
    },
    {
      id: "bitcoin",
      amount: 0.09,
      price: 104747.03513533014,
      date: 1737810220199,
      selected: false,
    },
    {
      id: "ethereum",
      amount: 10,
      price: 3157.6193174815944,
      date: 1714099600000,
      selected: false,
    },
    {
      id: "ripple",
      amount: 15,
      price: 1.99,
      date: 1724089600003,
      selected: false,
    },
    {
      id: "solana",
      amount: 5.5,
      price: 144.98792922284767,
      date: 1714139600000,
      selected: false,
    },
    {
      id: "dogecoin",
      amount: 10000,
      price: 0.15609548866810888,
      date: 1744981495492,
      selected: false,
    },
    {
      id: "payment",
      amount: 100000,
      price: 1,
      date: 1745981495492,
      currency: "$",
    },
  ];
  dataAssets.reduce((sum, item) => {
    sum + item.price * item.amount;
  });
  // dataAssets = dataAssets.concat(dataAssets);
  // dataAssets = dataAssets.concat(dataAssets);
  // dataAssets = dataAssets.concat(dataAssets);

  const [cryptoAssets, setCryptoAssets] = useState([]);

  useEffect(() => {
    // console.log(JSON.parse(sessionStorage.getItem("assets")));
    if (JSON.parse(sessionStorage.getItem("assets")) === null) {
      console.log("set");
      // console.log(dataAssets);
      setCryptoAssets(dataAssets);
      sessionStorage.setItem("assets", JSON.stringify(dataAssets));
    } else {
      setCryptoAssets((prev) => [...prev]);
      // console.log(cryptoAssets);
    }
  }, []);

  useEffect(() => {
    async function currencyLoad() {
      const data = await fetcCurrency();
      setCurrencyData(data);
    }
    currencyLoad();
  }, []);

  useEffect(() => {
    async function fetchCryptoinHistory() {
      setLoading(true);
      try {
        if (
          typeof selectedCoin === "string" &&
          historyData.interval > 0 &&
          !sessionStorage.getItem(historyData.interval + selectedCoin)
        ) {
          // console.log(
          //   "startFetch " + selectedCoin + " interval: " + historyData.interval
          // );
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=${historyData.interval}`
          );
          const data = await response.json();
          console.log(
            "date: " + data.prices[0][0] + " price: " + data.prices[0][1]
          );
          if ([...Object.entries(data)].length > 1) {
            const chartData = data.prices.map(([timestamp, price]) => ({
              date: dateFormat(timestamp),
              price: price,
            }));

            setHistoryData((prevHistoryData) => ({
              ...prevHistoryData,
              data: chartData,
            }));
            sessionStorage.setItem(
              historyData.interval + selectedCoin,
              JSON.stringify(chartData)
            );
          }

          setLoading(false);
        } else {
          setLoading(true);
          setHistoryData((prevHistoryData) => ({
            ...prevHistoryData,
            data: JSON.parse(
              sessionStorage.getItem(historyData.interval + selectedCoin)
            ),
          }));
          setLoading(false);
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    }
    fetchCryptoinHistory();
  }, [selectedCoin, historyData.interval]);

  useEffect(() => {
    async function preload() {
      const result = await FetchCrypto();

      // const result = await fakeFetchCrypto();
      // console.log(JSON.parse(sessionStorage.getItem("assets")));
      if (result.length > 5) {
        setAssets(
          JSON.parse(sessionStorage.getItem("assets")).map((asset) => {
            if (asset.id === "payment") {
              return asset;
            }
            const coin = result.find((c) => c.id === asset.id);

            return {
              grow: asset.price < coin?.price,
              growPercent: percentDiff(asset.price, coin.price),
              totalAmount: asset.amount * coin.price,
              totalProfit:
                asset.amount * coin.price - asset.amount * asset.price,
              ...asset,
            };
          })
        );
        // console.log(result);
        setCrypto(result);
      }
    }
    preload();
  }, [cryptoAssets]);

  return (
    <CryptoContext.Provider
      value={{
        loading,
        crypto,
        assets,
        selectedCoin,
        setSelectedCoin,
        historyData,
        setHistoryData,
        currencyData,
        currentCurrency,
        setCurrentCurrency,
        user,
        setUser,
        cryptoAssets,
        setCryptoAssets,
        setActiveButton,
        activeButton,
        balance,
        setBalance,
        modal,
        setModal,
        setSelNote,
        selNote,
        setTransHistory,
        transHistory,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

// export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
