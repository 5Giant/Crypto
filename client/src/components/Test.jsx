import { useEffect, useState, useCallback } from "react";
import Child from "./Child";
// import "./styles.css";

export default function Test() {
  const [counter, setCounter] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

  function updateOne() {
    console.log("Я не мемоизирован");
  }

  const updateTwo = useCallback(() => {
    console.log("Я мемоизирован!");
  }, [counterTwo]);

  return (
    <div className="App">
      <button
        style={{ width: "200px", height: "50px" }}
        onClick={() => setCounter(counter + 1)}
      >
        {counter}
      </button>
      <br />
      <button
        style={{ width: "200px", height: "50px" }}
        onClick={() => setCounterTwo(counterTwo + 1)}
      >
        {counterTwo}
      </button>
      <Child updateOne={updateOne} updateTwo={updateTwo} />
    </div>
  );
}
