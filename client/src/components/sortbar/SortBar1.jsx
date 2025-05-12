import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { CryptoContext } from "../../context/crypto-context";
import { Switch, Select, Space, Checkbox, Button } from "antd";
import { capitalize } from "../../components/utils";
import "./styles.css";
import increase from "../../res/increase.png";
import decrease from "../../res/decreasing.png";

// Вынесем дефолтные значения в константу
const DEFAULT_OPTIONS = {
  filter: "none",
  sort: null,
  payment: true,
  coin: true,
  direction: true,
};

export default function SortBar1() {
  //   console.log("sortbar");
  const [isReady, setIsReady] = useState(false);
  const [selBtn, setSelBtn] = useState();
  const { setSelNote, selNote, balance, setTransHistory, transHistory } =
    useContext(CryptoContext);

  // Функция для безопасного получения данных из sessionStorage
  const getSessionData = (key, defaultValue) => {
    try {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error parsing ${key} from sessionStorage`, e);
      return defaultValue;
    }
  };

  // Инициализация состояния с проверкой sessionStorage
  const [selectedOption, setSelectedOption] = useState(() => {
    return getSessionData("selOptions", DEFAULT_OPTIONS);
  });

  const setSelected = (data) => {
    return data?.map((item, index) => {
      return {
        ...item,
        selected: Number(selNote.selNote) === item.date ? true : false,
      };
    });
  };

  const savedData = () => {
    return getSessionData("assets", []);
  };

  const [dataAssets, setDataAssets] = useState(() => setSelected(savedData()));

  const options = [
    { value: "none", label: "None" },
    { value: "total", label: "Total price" },
    { value: "price", label: "Price" },
    { value: "amount", label: "Amount" },
    { value: "date", label: "Date" },
    { value: "coin", label: "Coin" },
  ];

  const sortButtons = [
    { className: "coin sort-btn coin-title", option: "coin", label: "Coin" },
    { className: "item amount sort-btn", option: "amount", label: "Amount" },
    { className: "item price sort-btn", option: "price", label: "Price" },
    { className: "item total sort-btn", option: "total", label: "Total price" },
    { className: "item date sort-btn", option: "date", label: "Date" },
  ];

  let coinID = new Set(savedData().map((item) => item.id));

  function Sort(data) {
    if (!data) return data;

    // Используем текущие selectedOption, а не сохраненные
    const currentOptions = selectedOption;

    if (currentOptions.filter !== "none") {
      data = setSelected(
        data.filter((item) => item.id === currentOptions.filter)
      );
    }

    if (!currentOptions.coin) {
      data = data.filter((item) => item.id === "payment");
    }
    if (!currentOptions.payment) {
      data = data.filter((item) => item.id != "payment");
    }

    if (
      !(currentOptions.sort === "total") &&
      !(currentOptions.sort === "date") &&
      !(currentOptions.sort === "none") &&
      currentOptions.sort
    ) {
      data = data.filter((item) => item.id != "payment");
    }

    if (currentOptions.sort) {
      if (currentOptions.sort === "coin") {
        data = data.sort((a, b) => b.id.charCodeAt(0) - a.id.charCodeAt(0));
      }
      if (currentOptions.sort === "total") {
        data = data.sort((a, b) => b.price * b.amount - a.price * a.amount);
      }
      if (currentOptions.sort != "id" && currentOptions.sort != "total") {
        data = data?.sort(
          (a, b) => b[currentOptions.sort] - a[currentOptions.sort]
        );
      }
    }

    !currentOptions.direction ? data?.reverse() : null;
    return data;
  }

  useEffect(() => {
    // Инициализация selNote
    const initialSelNote = getSessionData("selNote", {
      selNote: 0,
      scroll: false,
    });
    setSelNote(initialSelNote);

    // Инициализация данных
    const assets = savedData();
    setDataAssets(setSelected(assets));

    // Установка флага готовности
    setIsReady(true);
  }, []);

  const memoizedSort = useMemo(() => {
    console.log("memo");
    return Sort(savedData());
  }, [
    selectedOption.filter,
    selectedOption.sort,
    selectedOption.payment,
    selectedOption.coin,
    selectedOption.direction,
    balance,
  ]);

  useEffect(() => {
    if (!isReady) return;

    // Сохраняем options в sessionStorage при изменении
    sessionStorage.setItem("selOptions", JSON.stringify(selectedOption));

    // Обновляем transHistory
    setTransHistory((prev) => ({
      ...prev,
      options: selectedOption,
      assets: setSelected(memoizedSort),
    }));
  }, [selectedOption, balance, selNote?.selNote, isReady]);

  const onChange = (checked) => {
    const newSelNote = { ...selNote, scroll: checked };
    setSelNote(newSelNote);
    sessionStorage.setItem("selNote", JSON.stringify(newSelNote));
  };

  const HandleSelectSort = useCallback((value) => {
    setSelBtn(value);
    setSelectedOption((prev) => ({
      ...prev,
      sort: value,
    }));
  }, []);

  const HandleSelectCoin = useCallback((value) => {
    setSelectedOption((prev) => ({
      ...prev,
      filter: value,
    }));
  }, []);

  const onChangePayments = useCallback((e) => {
    setSelectedOption((prev) => {
      const newOptions = {
        ...prev,
        payment: e.target.checked,
        sort: prev.sort !== "date" ? null : prev.sort,
      };
      return newOptions;
    });
  }, []);

  const onChangeCoins = useCallback((e) => {
    setSelectedOption((prev) => ({
      ...prev,
      coin: e.target.checked,
    }));
  }, []);

  const HandleClickReverse = useCallback(() => {
    setSelectedOption((prev) => ({
      ...prev,
      direction: !prev.direction,
    }));
  }, []);

  const HandleClickSort = useCallback((event) => {
    const option = event.currentTarget?.dataset?.option;
    if (!option) return;

    setSelBtn(option);
    setSelectedOption((prev) => ({
      ...prev,
      sort: option,
    }));
  }, []);

  const HandleClickClear = useCallback(() => {
    const assets = savedData();
    const newOptions = DEFAULT_OPTIONS;

    setTransHistory({
      assets: assets,
      options: newOptions,
      selected: {},
    });

    setSelectedOption(newOptions);
    sessionStorage.setItem("selOptions", JSON.stringify(newOptions));
    setSelBtn(null);
    setSelNote((prev) => ({ ...prev, selNote: 0 }));
  }, []);

  if (!dataAssets) {
    return null;
  }

  return (
    <>
      <div className="sort-bar">
        <button className="reverse-btn" onClick={HandleClickReverse}>
          <img
            className="reverse-img"
            src={selectedOption.direction ? decrease : increase}
            alt="sort direction"
          />
        </button>
        <Select
          value={selectedOption.sort}
          placeholder={"Sorted by"}
          onSelect={HandleSelectSort}
          className="sorted-select"
          options={options}
          optionRender={(option) => <Space>{option.label}</Space>}
        />
        <Select
          className="coin-select"
          value={selectedOption.filter}
          placeholder="Select coin"
          onSelect={HandleSelectCoin}
          options={[
            { value: "none", label: "All" },
            ...[...coinID].map((item) => ({
              value: item,
              label: capitalize(item),
            })),
          ]}
          optionRender={(option) => <Space>{option.label}</Space>}
        />
        <div>
          <Checkbox
            onChange={onChangePayments}
            checked={selectedOption.payment}
          >
            Payments
          </Checkbox>
        </div>
        <div>
          <Checkbox onChange={onChangeCoins} checked={selectedOption.coin}>
            Coins
          </Checkbox>
        </div>
        <div className="switch-container">
          <Button className="clear-btn" onClick={HandleClickClear}>
            Clear
          </Button>
          <div className="text-switch">
            <p>Auto Scroll</p>
            <Switch
              className="focus-switch"
              checked={selNote.scroll}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div className="sort-buttons">
        {sortButtons.map((btn, index) => {
          return (
            <button
              key={index}
              onClick={HandleClickSort}
              data-option={btn.option}
              className={`${btn.className} ${
                btn.option === selBtn ? "sort-btn-selected" : ""
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
    </>
  );
}
