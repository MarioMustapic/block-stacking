import "./PlayingField.styles.scss";
import { useState } from "react";
import { CompositeBlock } from "../CompositeBlock/CompositeBlock.component";
import { useEffect } from "react";

export function PlayingField() {
  // prettier-ignore
  const [state, setState] = useState ({
      top: 0,                       //def value for starting Y-axis position(top)
      left: 0,                      //def value for starting X-axis position(centered)
      rotation: 0,                  //def value for angle of composite block
      isInColision:                 //def value for colision logic
        {
          down:[false,false,false,false,],
          right:[false,false,false,false,],
          left:[false,false,false,false,],
          rotation:[false,false,false,false,],
        },
      toAppend: false,
      toRenderCompositeBlock: true,
      playingFieldWidth: 24,
      playingFieldHeight: 28,
      text: "",                     //block text (atm no use)
      gravityTimer: 5000,         //timer for downward movment over time
      basicBlockSize: 20,           //size in pixels
      compositeBlockSize: 5,        //max height or width in number of basicBlocks
      backgroundColor: "",          //def background color
      blockType: Math.floor(Math.random() * 7),  //block randomizer
      gameOver: false,              //if true, start over
  });
  const [playingFieldBlocksCords, updatePlayingFieldBlocksCords] = useState([]);
  const [gravityTick, setGravityTick] = useState(0);

  useEffect(() => {
    if (state.toRenderCompositeBlock === false)
      setState(() => ({
        ...state,
        blockType: Math.floor(Math.random() * 7),
        toRenderCompositeBlock: true,
      }));
    setGravityTick(0);
  }, [state]);

  useEffect(() => {
    // "gravity" timer, make blocks move down on interval
    const timer = setInterval(() => {
      setGravityTick((gravityTick) => gravityTick + 1);
    }, state.gravityTimer);
    return () => clearTimeout(timer);
  }, [state.gravityTimer]);

  const handleClick = (e) => {
    e.preventDefault();
    const compositeBlock = document.querySelector(".compositeBlock");
    const playingField = document.querySelector(".playingField");
    compositeBlock.focus();
    playingField.classList.add("focus");
    compositeBlock.addEventListener("focusout", () =>
      playingField.classList.remove("focus")
    );
  };

  return (
    <div
      className="playingField"
      onClick={handleClick}
      tabIndex={0}
      style={{
        width: `${state.basicBlockSize * state.playingFieldWidth}px`,
        height: `${state.basicBlockSize * state.playingFieldHeight}px`,
        left: `${
          window.innerWidth / 2 -
          (state.basicBlockSize * state.playingFieldWidth) / 2
        }px`,
      }}
    >
      {state.toRenderCompositeBlock && (
        <CompositeBlock
          defBlockState={state}
          setDefBlockState={setState}
          playingFieldBlocksCords={playingFieldBlocksCords}
          updatePlayingFieldBlocksCords={updatePlayingFieldBlocksCords}
          gravityTick={gravityTick}
          setGravityTick={setGravityTick}
        />
      )}
    </div>
  );
}
