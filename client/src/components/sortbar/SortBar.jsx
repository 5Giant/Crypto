import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { CryptoContext } from "../../context/crypto-context";
import { Switch, Select, Space, Checkbox, Button } from "antd";
import { capitalize } from "../../components/utils";
import "./styles.css";
import increase from "../../res/increase.png";
import decrease from "../../res/decreasing.png";

export default function SortBar() {
  console.log("sortbar");
  const [isReady, setIsReady] = useState(false);
  const [selBtn, setSelBtn] = useState();
  const { setSelNote, selNote, balance, setTransHistory, transHistory } =
    useContext(CryptoContext);
  const setSelected = (data) => {
    return data?.map((item, index) => {
      return {
        ...item,
        selected: Number(selNote.selNote) === item.date ? true : false,
      };
    });
  };
  const savedData = () => {
    return JSON.parse(sessionStorage.getItem("assets"));
  };

  const [dataAssets, setDataAssets] = useState(setSelected(savedData()));

  const [selectedOption, setSelectedOption] = useState({
    filter: "none",
    sort: null,
    payment: true,
    coin: true,
    direction: true,
  });
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

  if (!sessionStorage.getItem("selOptions")) {
    sessionStorage.setItem("selOptions", JSON.stringify(selectedOption));
  }

  const length = dataAssets?.length - 1;
  let savedSelNote;
  let savedOptions = JSON.parse(sessionStorage.getItem("selOptions"));
  let coinID = new Set(savedData().map((item) => item.id));

  if (!sessionStorage.getItem("selNote")) {
    sessionStorage.setItem("selNote", JSON.stringify(selNote));
    console.log("save");
  }

  function Sort(data) {
    // console.log(selectedOption);
    if (selectedOption.filter || selectedOption.sort) {
      sessionStorage.setItem("selOptions", JSON.stringify(selectedOption));
    }
    savedOptions = JSON.parse(sessionStorage.getItem("selOptions"));
    if (!savedOptions) {
      savedOptions = selectedOption;
    }

    console.log(savedOptions);
    if (savedOptions.filter !== "none") {
      console.log("!!!!!!!!!!!!!!", savedOptions.filter);
      data = setSelected(
        data.filter((item) => item.id === savedOptions.filter)
      );
    }
    // console.log(savedOptions);
    if (!savedOptions.coin) {
      data = data.filter((item) => item.id === "payment");
    }
    if (!savedOptions.payment) {
      data = data.filter((item) => item.id != "payment");
    }
    console.log(savedOptions);
    if (
      !(savedOptions.sort === "total") &&
      !(savedOptions.sort === "date") &&
      !(savedOptions.sort === "none") &&
      savedOptions.sort
    ) {
      data = data.filter((item) => item.id != "payment");
      setSelectedOption((prev) => ({
        ...prev,
        payment: false,
      }));
    }
    if (savedOptions.sort) {
      // console.log(savedOptions.sort);
      if (savedOptions.sort === "coin") {
        setSelected(
          (data = data.sort((a, b) => b.id.charCodeAt(0) - a.id.charCodeAt(0)))
        );
      }
      if (savedOptions.sort === "total") {
        setSelected(
          (data = data.sort((a, b) => b.price * b.amount - a.price * a.amount))
        );
      }
      if (savedOptions.sort != "id" && savedOptions.sort != "total") {
        setSelected(
          data?.sort((a, b) => b[savedOptions.sort] - a[savedOptions.sort])
        );
      }
    }
    // console.log(data);
    !savedOptions.direction ? data?.reverse() : null;
    // console.log(selectedOption);
    return data;
  }

  useEffect(() => {
    savedSelNote = JSON.parse(sessionStorage.getItem("selNote"));
    // console.log(savedSelNote);
    savedSelNote.selNote = 0;

    setSelNote(savedSelNote);
    setDataAssets(setSelected(savedData()));

    savedSelNote = JSON.parse(sessionStorage.getItem("selNote"));
    savedSelNote.selNote ? setSelNote(savedSelNote) : null;
    setTimeout(() => {
      setIsReady(true);
    }, 100);
    if (sessionStorage.getItem("selOptions")) {
      setSelectedOption(JSON.parse(sessionStorage.getItem("selOptions")));
    }
    setSelBtn(savedOptions.sort);
    // setIsReady(true);
    console.log("DataSet");
  }, []);

  //Скрол
  //   useEffect(() => {
  //     selNote.scroll
  //       ? document
  //           .getElementById("selected")
  //           ?.scrollIntoView({ behavior: "smooth", block: "center" })
  //       : null;
  //   });

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

  //Фильтр
  useEffect(() => {
    // console.log(selectedOption);
    // setDataAssets(Sort(savedData()));
    // setDataAssets(setSelected(memoizedSort));
    setTransHistory((prev) => ({
      ...prev,
      options: selectedOption,
      assets: setSelected(memoizedSort),
    }));
  }, [
    selectedOption,
    balance,
    selNote?.selNote,
    selectedOption.payment,
    selectedOption.coin,
  ]);

  const onChange = (checked) => {
    const newSelNote = { ...selNote, scroll: !selNote.scroll };
    setSelNote(newSelNote);
    sessionStorage.setItem("selNote", JSON.stringify(newSelNote));
  };

  const HandleSelectSort = useCallback((value) => {
    setSelBtn(value);
    setSelectedOption((prev) => ({
      ...prev,
      filter: savedOptions.filter,
      sort: value,
    }));
  }, []);

  //   const HandleSelectCoin = useCallback((value) => {
  //     console.log("value: " + value);
  //     setSelectedOption((prev) => ({
  //       ...prev,
  //       sort: savedOptions.sort,
  //       filter: value,
  //     }));
  //   }, []);

  const HandleSelectCoin = useCallback((value) => {
    console.log("Selected coin:", value);
    setSelectedOption((prev) => ({
      ...prev,
      filter: value,
      sort: prev.sort,
    }));
  }, []);

  const onChangePayments = useCallback((e) => {
    if (selectedOption.sort != "date") {
      setSelBtn();
    }
    setSelectedOption((prev) => ({
      ...prev,
      payment: e.target.checked,
      sort: prev.sort != "date" ? "none" : prev.sort,
    }));
  }, []);

  const onChangeCoins = useCallback((e) => {
    console.log(`checked = ${e.target.checked}`);
    setSelectedOption((prev) => ({
      ...prev,
      coin: e.target.checked,
    }));
  }, []);

  const HandleClickReverse = useCallback(() => {
    console.log("direction");
    setSelectedOption((prev) => ({
      ...prev,
      direction: !prev.direction,
    }));
  }, []);

  const HandleClickSort = useCallback((event) => {
    if (!event.currentTarget) {
      console.error("Event target is null!", event);
      return;
    }
    console.log("click");
    setSelBtn(event.currentTarget.dataset.option);
    const option = event.currentTarget.dataset.option;
    console.log(option);
    setSelectedOption((prev) => ({
      ...prev,
      sort: option,
    }));
  }, []);

  const HandleClickClear = useCallback(() => {
    setTransHistory({
      assets: savedData(),
      options: {},
      selected: {},
    });
    const newOptions = {
      filter: "none",
      sort: null,
      payment: true,
      coin: true,
      direction: true,
    };
    setSelectedOption(newOptions);
    sessionStorage.setItem("selOptions", JSON.stringify(newOptions));
    setSelBtn(null);
    setSelNote((prev) => ({ ...prev, selNote: 10000 }));
  }, []);

  if (!dataAssets) {
    return;
  }
  //   console.log(transHistory);
  return (
    <>
      <div className="sort-bar">
        <button className="reverse-btn" onClick={HandleClickReverse}>
          <img
            className="reverse-img"
            src={selectedOption.direction ? decrease : increase}
          ></img>
        </button>
        <Select
          value={savedOptions.sort}
          placeholder={"Sorted by"}
          onSelect={HandleSelectSort}
          className="sorted-select"
          options={options}
          optionRender={(option) => <Space>{option.label}</Space>}
        />
        <Select
          className="coin-select"
          value={selectedOption.filter}
          //   value={savedOptions.filter}
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
            // defaultChecked={true}
            checked={JSON.parse(sessionStorage.getItem("selOptions")).payment}
          >
            Payments
          </Checkbox>
        </div>
        <div>
          <Checkbox
            onChange={onChangeCoins}
            // defaultChecked={true}
            checked={JSON.parse(sessionStorage.getItem("selOptions")).coin}
          >
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
              defaultChecked={false}
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
              // className={btn.className}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
    </>
  );
}
