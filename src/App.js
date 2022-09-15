import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { CompositeBlock } from "./components/CompositeBlock/CompositeBlock.component";

function App() {
  // prettier-ignore
  const [state, setstate] = useState({
    top: 0,                       //def value for starting Y-axis position(top)
    left: 0,                      //def value for starting X-axis position(centered)
    x: "top",                     //proxy for top keyword
    y: "left",                    //proxy for left keyword
    text: "",                     //block text (atm no use)
    gravityTimer: 100000000,      //timer for downward movment over time  
    basicBlockSize: 20,           //size in pixels
    compositeBlockSize: 4,        //max height or width in number of basicBlocks
    backgroundColor: "green",     //def background color
    blockType: Math.floor(Math.random() * 7),  //block randomizer
  });
  console.log(state.blockType);
  useEffect(() => {
    const timer = setInterval(() => {
      setstate((state) => ({
        ...state,
        [state.x]: state.top + state.basicBlockSize,
      }));
    }, state.gravityTimer);
    return () => clearTimeout(timer);
  }, [state.gravityTimer]);

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
        [state.x]: state.top + state.basicBlockSize,
      }));
    } else if (e.code === "ArrowRight") {
      return setstate((state) => ({
        ...state,
        [state.y]: state.left + state.basicBlockSize,
      }));
    } else if (e.code === "ArrowLeft") {
      return setstate((state) => ({
        ...state,
        [state.y]: state.left - state.basicBlockSize,
      }));
    }
  };
  return (
    <div className="App">
      <div
        className="playingField"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{
          width: `${state.basicBlockSize * 12}px`,
          height: `${state.basicBlockSize * 28}px`,
        }}
      >
        <CompositeBlock
          blockState={state}
          onClick={handleKeyDown}
          onKeyDown={handleKeyDown}
        />
      </div>
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
