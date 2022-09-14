import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { BasicBlock } from "./components/BasicBlock/BasicBlock.component";

function App() {
  const [state, setstate] = useState({ top: 0, left: 0, x: "top", y: "left" });
  console.log(state);

  useEffect(() => {
    const timer = setInterval(() => {
      setstate((state) => ({
        ...state,
        [state.x]: state.top + 1,
      }));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (
      e.code !== "ArrowDown" &&
      e.code !== "ArrowLeft" &&
      e.code !== "ArrowRight"
    )
      return;
    else if (e.code === "ArrowDown") {
      return setstate((state) => ({
        ...state,
        [state.x]: state.top + 1,
      }));
    } else if (e.code === "ArrowRight") {
      return setstate((state) => ({
        ...state,
        [state.y]: state.left + 1,
      }));
    } else if (e.code === "ArrowLeft") {
      return setstate((state) => ({
        ...state,
        [state.y]: state.left - 1,
      }));
    }
  };
  return (
    <div className="App" tabIndex={0} onKeyDown={handleKeyDown}>
      <BasicBlock
        backgroundColor={"red"}
        top={`${state.top}vw`}
        left={`${state.left}vw`}
        text={12}
        onClick={handleKeyDown}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default App;

//   make other shapes based on BasicBlock  ?? make one composite and pass it arguments instead of making one by one, that might enable random generation?

//  make movement logic, if posible in same handler or better in separate?
//  and add block droping down ("gravity")

//  make colision logic

//  make pieces "stick" to botom and other pieces that are already "dead"

//  make row complete logic with row remove and upper rows move down

//  game over logic

//  score?
