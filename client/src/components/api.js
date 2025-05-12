import {
  cryptoAssets,
  cryptoData,
  currencySymbols,
  currencyFake,
} from "../data";

export function fakeFetchCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 1);
  });
}

export async function FetchCrypto() {
  const response = await fetch(`http://localhost:3001/api/crypto`)
    .then((res) => res.json())
    .catch((error) => console.error("Ошибка:", error));
  const data = response.result;
  data[4].id = "binancecoin";
  // console.log(data);
  return data;
}

export function fetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1);
  });
}

export async function fetcCurrency() {
  // try {
  //   const key2 = "cur_live_Rzkcibbkpt7ZXI78z5OegpWWWZQWPlY8xt5aLB2l";
  //   const key1 = "241c7c22b0241750e5d0cc9e";
  //   if (true) {
  //     const response = await fetch(
  //       `https://v6.exchangerate-api.com/v6/${key1}/latest/USD`
  //     );

  //     const data = await response.json();

  //     const currency = Object.entries(data.conversion_rates).map(
  //       (currentValue, index) => {
  //         currentValue.push(currencySymbols[index].symbol);
  //         return currentValue;
  //       }
  //     );

  //     return currency;
  //   }
  // } catch (error) {
  //   console.error("Ошибка при получении данных:", error);
  // }
  return currencyFake;
}

export async function userAuth(data) {
  try {
    const response = await fetch("http://localhost:3001/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Ошибка HTTP: " + response.status);
    const status = await response.json();
    console.log(status);
    return status;
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
}
