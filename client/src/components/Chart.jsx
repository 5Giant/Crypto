import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useCrypto } from "../context/crypto-context";
import crosshairPlugin from "chartjs-plugin-crosshair";
import { crosshairLabelPlugin } from "./plugins";
import { Spin } from "antd";
// Регистрируем компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  crosshairPlugin,
  crosshairLabelPlugin
);

const chartStyle = {
  width: "100%",
  height: "500px",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  touchAction: "none",
};

export default function Chart() {
  const {
    assets,
    crypto,
    selectedCoin,
    setSelectedCoin,
    historyData,
    loading,
    currentCurrency,
  } = useCrypto();
  //   console.log(Math.min(...historyData.map((item) => item.price)));
  // console.log(historyData);
  const data = {
    labels: historyData.data.map((item) => `${item.date.day} `),
    datasets: [
      {
        data: historyData.data.map((item) => {
          return item.price * currentCurrency[1];
        }),
        borderColor: "#1890ff",
        backgroundColor: "rgba(24, 144, 255, 0.2)",
        pointRadius: 0,
      },
    ],
  };

  //   const options = {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         position: "top",
  //       },
  //     },
  //     scales: {
  //       x: {
  //         ticks: {
  //           // maxRotation: 90,
  //           // minRotation: 45,
  //           maxTicksLimit: 11,
  //         },
  //       },
  //     },
  //   };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        zoom: {
          enabled: false, // Отключает полностью
        },
        pan: {
          enabled: false, // Отключает панорамирование
        },
      },
      crosshair: {
        zoom: {
          enabled: false,
        },
        line: {
          color: "grey",
          width: 1,
          dashPattern: [5, 5],
        },
        sync: {
          enabled: true,
        },
      },
      legend: {
        // position: "top",
        display: false,
      },
      tooltip: {
        displayColors: false,
        enabled: true, // Включить tooltip
        mode: "nearest", // Показывать для ближайшей точки
        intersect: false, // Работать при наведении на линию, а не строго на точку

        callbacks: {
          title: function (context) {
            return `time: ${historyData.data[context[0].dataIndex].date.time}`;
          },
          label: function (context) {
            // Кастомный формат текста в tooltip
            // console.log(context.dataIndex);
            const date = historyData.data[context.dataIndex];
            return `${date.date.year}-${date.date.month}-${
              date.date.day
            } ${date.price.toFixed(2)}$`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        position: "right",
        beginAtZero: false,
        grid: {
          display: true,
        },
      },
    },
  };

  if (loading) {
    console.log(loading);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "500px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={chartStyle}>
      <Line data={data} options={options} />
    </div>
  );
}
