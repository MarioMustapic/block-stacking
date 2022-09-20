import "./PlayingField.styles.scss";
import { useEffect } from "react";
import { useState } from "react";
import { CompositeBlock } from "../CompositeBlock/CompositeBlock.component";

export function PlayingField(props) {
  // prettier-ignore
  const [state, setstate] = useState ({
      top: 0,                       //def value for starting Y-axis position(top)
      left: 0,                      //def value for starting X-axis position(centered)
      rotation: 0,                  //def value for angle of composite block
      isInColision:                 //def value for colision logic
            {down:false, right:false,left:false,rotation:false,},
      playingFieldWidth: 24,
      playingFieldHeight: 28,
      x: "top",                     //proxy for top keyword
      y: "left",                    //proxy for left keyword
      z: "rotation",                //proxy for rotatio keyword
      text: "",                     //block text (atm no use)
      gravityTimer: 100000,           //timer for downward movment over time  
      basicBlockSize: 20,           //size in pixels
      compositeBlockSize: 5,        //max height or width in number of basicBlocks
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
  const appendToTerrain = () => {
    /// move blocks from composite to terrain
  };
  const handleKeyDown = (e) => {
    e.preventDefault();
    if (e.code === "ArrowDown") {
      if (state.isInColision.down === true) {
        appendToTerrain();
        return;
      }
      return setstate((state) => ({
        ...state,
        [state.x]: state.top + state.basicBlockSize,
      }));
    } else if (e.code === "ArrowRight" && state.isInColision.right === false) {
      return setstate((state) => ({
        ...state,
        [state.y]: state.left + state.basicBlockSize,
      }));
    } else if (e.code === "ArrowLeft" && state.isInColision.left === false) {
      return setstate((state) => ({
        ...state,
        [state.y]: state.left - state.basicBlockSize,
      }));
    } else if (e.code === "ArrowUp" && state.isInColision.rotation === false) {
      return setstate((state) => ({
        ...state,
        [state.z]: state.rotation + 90,
      }));
    }
  };

  return (
    <div
      className="playingField"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        width: `${state.basicBlockSize * state.playingFieldWidth}px`,
        height: `${state.basicBlockSize * state.playingFieldHeight}px`,
        left: `${
          window.innerWidth / 2 -
          (state.basicBlockSize * state.playingFieldWidth) / 2
        }px`,
      }}
    >
      <CompositeBlock blockState={state} />
    </div>
  );
}
