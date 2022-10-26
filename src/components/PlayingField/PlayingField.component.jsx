import "./PlayingField.styles.scss";
import { useState } from "react";
import { CompositeBlock } from "../CompositeBlock/CompositeBlock.component";
import { PlayingFieldBlock } from "../PlayingFieldBlocks/PlayingFieldBlocks.component";
import { useEffect } from "react";
import { useRef } from "react";
import { Sidebar } from "../Sidebar/Sidebar.component";

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
      playingFieldWidth: 10,
      playingFieldHeight: 20,
      text: "",                     //block text (atm no use)
      gravityTimer: 700,         //timer for downward movment over time
      basicBlockSize: 25,           //size in pixels
      compositeBlockSize: 5,        //max height or width in number of basicBlocks
      backgroundColor: "",          //def background color
      blockType: Math.floor(Math.random() * 7),  //block randomizer
      gameOver: false,              //if true, start over
      mode: "desktop",              //def display mode
  });
  const [playingFieldBlocksCords, updatePlayingFieldBlocksCords] = useState([]);
  const [rowsToCheck, setRowsToCheck] = useState([]);
  const [gravityTick, setGravityTick] = useState(0);

  useEffect(() => {
    if ("ontouchstart" in document.documentElement === true)
      setState((state) => ({
        ...state,
        mode: "mobile", //set to mobile if detecting touchscreen
      }));
  }, []);

  useEffect(() => {
    let scaleCoef = 22; //scaling factor for basicBlockSize
    if (state.mode === "mobile") scaleCoef = 42;
    setState((state) => ({
      ...state,
      basicBlockSize: Math.floor(window.innerHeight / scaleCoef),
    }));
  }, [state.mode]);

  useEffect(() => {
    if (state.toRenderCompositeBlock === false)
      setState((state) => ({
        ...state,
        blockType: Math.floor(Math.random() * 7), //generate random block before rendering compositeBlock
        toRenderCompositeBlock: true,
      }));
    setGravityTick(0);
  }, [state.toRenderCompositeBlock]);

  useEffect(() => {
    const timer = setInterval(() => {
      setGravityTick((gravityTick) => gravityTick + 1); // "gravity" timer, make blocks move down on interval
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
    let rowBlocks = [];
    rowsToCheck.sort(function (a, b) {
      return a - b;
    });
    rowsToCheck.forEach((row) => {
      rowBlocks = playingFieldBlocksCords.filter((e) => e.top === row); //row completition logic
      if (rowBlocks.length === state.playingFieldWidth) {
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
      className="gameWrapper"
      style={{
        width: `${2 * state.basicBlockSize * (state.playingFieldWidth + 1)}px`,
        height: `${state.basicBlockSize * (state.playingFieldHeight + 1)}px`,
      }}
    >
      <div
        ref={playingFieldRef}
        className="playingField"
        onClick={handleClick}
        tabIndex={0}
        style={{
          width: `${state.basicBlockSize * state.playingFieldWidth}px`,
          height: `${state.basicBlockSize * state.playingFieldHeight}px`,
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
      <Sidebar
        style={{
          width: `${state.basicBlockSize * 6}px`,
          height: `${state.basicBlockSize * state.playingFieldHeight}px`,
        }}
      />
    </div>
  );
}
