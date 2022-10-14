import "./PlayingField.styles.scss";
import { useState } from "react";
import { CompositeBlock } from "../CompositeBlock/CompositeBlock.component";
import { PlayingFieldBlock } from "../PlayingFieldBlocks/PlayingFieldBlocks.component";
import { useEffect } from "react";
import { useRef } from "react";

export function PlayingField() {
  const playingFieldRef = useRef(null);
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
      toRotate:true,
      playingFieldWidth: 12,
      playingFieldHeight: 28,
      text: "",                     //block text (atm no use)
      gravityTimer: 50000,         //timer for downward movment over time
      basicBlockSize: 20,           //size in pixels
      compositeBlockSize: 5,        //max height or width in number of basicBlocks
      backgroundColor: "",          //def background color
      blockType: Math.floor(Math.random() * 7),  //block randomizer
      gameOver: false,              //if true, start over
  });
  const [playingFieldBlocksCords, updatePlayingFieldBlocksCords] = useState([]);
  const [rowsToCheck, setRowsToCheck] = useState([]);
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

  if (rowsToCheck.length !== 0) {
    let playingFieldBlocksCordsAfter = structuredClone(playingFieldBlocksCords);
    console.log(playingFieldBlocksCordsAfter, playingFieldBlocksCords);
    let rowBlocks = [];
    console.log(rowsToCheck);
    rowsToCheck.sort(function (a, b) {
      return a - b;
    });
    console.log(rowsToCheck);
    rowsToCheck.forEach((row) => {
      rowBlocks = playingFieldBlocksCords.filter((e) => e.top === row);
      if (rowBlocks.length === state.playingFieldWidth) {
        console.log("deleting row", row);
        playingFieldBlocksCordsAfter = playingFieldBlocksCordsAfter.filter(
          (e) => e.top !== row
        );
        playingFieldBlocksCordsAfter = playingFieldBlocksCordsAfter.map((e) => {
          if (e.top > row) return e;
          return {
            ...e,
            top: e.top + 1,
          };
        });
      }
    });
    setRowsToCheck([]);
    updatePlayingFieldBlocksCords(playingFieldBlocksCordsAfter);
  }
  const playingFieldBlock = playingFieldBlocksCords.map((playingFieldBlock) => (
    <PlayingFieldBlock
      key={`row__${playingFieldBlock.top} column__${playingFieldBlock.left}`}
      id={`row__${playingFieldBlock.top} column__${playingFieldBlock.left}`}
      indexkey={`row__${playingFieldBlock.top} column__${playingFieldBlock.left}`}
      defBlockState={state}
      setDefBlockState={setState}
      playingFieldBlock={playingFieldBlock}
      playingFieldBlocksCords={playingFieldBlocksCords}
      updatePlayingFieldBlocksCords={updatePlayingFieldBlocksCords}
    />
  ));

  return (
    <div
      ref={playingFieldRef}
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
      {playingFieldBlock}
      {state.toRenderCompositeBlock && (
        <CompositeBlock
          defBlockState={state}
          setDefBlockState={setState}
          playingFieldBlocksCords={playingFieldBlocksCords}
          updatePlayingFieldBlocksCords={updatePlayingFieldBlocksCords}
          gravityTick={gravityTick}
          setGravityTick={setGravityTick}
          rowsToCheck={rowsToCheck}
          setRowsToCheck={setRowsToCheck}
        />
      )}
    </div>
  );
}
