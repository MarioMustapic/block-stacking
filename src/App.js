import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { CompositeBlock } from "./components/CompositeBlock/CompositeBlock.component";

function App() {
  // prettier-ignore
  const [state, setstate] = useState({
    top: 0,                       //def value for starting Y-axis position(top)
    left: 0,                      //def value for starting X-axis position(centered)
    rotation: 0,                  //def value for angle of composite block
    isInColision: false,          //def value for colision logic
    x: "top",                     //proxy for top keyword
    y: "left",                    //proxy for left keyword
    z: "rotation",                //proxy for rotatio keyword
    text: "",                     //block text (atm no use)
    gravityTimer: 5000,           //timer for downward movment over time  
    basicBlockSize: 20,           //size in pixels
    compositeBlockSize: 4,        //max height or width in number of basicBlocks
    backgroundColor: "green",     //def background color
    blockType: Math.floor(Math.random() * 7),  //block randomizer
  });
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
    if (e.code === "ArrowDown" && state.isInColision === false) {
      return setstate((state) => ({
        ...state,
        [state.x]: state.top + state.basicBlockSize,
      }));
    } else if (e.code === "ArrowRight" && state.isInColision === false) {
      return setstate((state) => ({
        ...state,
        [state.y]: state.left + state.basicBlockSize,
      }));
    } else if (e.code === "ArrowLeft" && state.isInColision === false) {
      return setstate((state) => ({
        ...state,
        [state.y]: state.left - state.basicBlockSize,
      }));
    } else if (e.code === "ArrowUp") {
      return setstate((state) => ({
        ...state,
        [state.z]: state.rotation + 90,
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
          left: `${window.innerWidth / 2 - (state.basicBlockSize * 12) / 2}px`,
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
//  add rotation
//  and add block droping down ("gravity")

//  make colision logic

//  make pieces "stick" to botom and other pieces that are already "dead"

//  make row complete logic with row remove and upper rows move down

//  game over logic

//  score?
