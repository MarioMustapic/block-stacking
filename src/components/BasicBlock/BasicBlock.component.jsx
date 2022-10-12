import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  const blockRef = useRef(null);
  const [basicBlockState, setBasicBlockState] = useState({
    ...props.compositeBlockState,
    blockRole: "",
  });
  const [staticCord, setStaticCord] = useState({});
  const [compositeBlockOffset, setCompositeBlockOffset] = useState({
    x: props.compositeBlock.x,
    y: props.compositeBlock.y,
  });

  useEffect(() => {
    if (basicBlockState.blockRole === "")
      setBasicBlockState((state) => ({
        ...state,
        blockRole: "moving",
      }));
  }, [basicBlockState.blockRole]);

  useEffect(() => {
    if (basicBlockState.blockRole === "static")
      setBasicBlockState((state) => ({
        ...state,
        blockRole: "static",
      }));
  }, [basicBlockState.blockRole]);

  let calculatedY = props.compositeBlockState.top + compositeBlockOffset.y;
  let calculatedX =
    props.compositeBlockState.left +
    compositeBlockOffset.x +
    Math.floor(basicBlockState.playingFieldWidth / 2) -
    2;

  let x = compositeBlockOffset.x;
  let y = compositeBlockOffset.y;
  // let blockCollisionRotate = false;

  switch (x) {
    case -1:
      x = 1;
      y = 3; //I-block band-aid for now
      break;
    case 0:
      switch (y) {
        case 0:
          x = 2;
          y = 0;
          break;
        case 1:
          x = 1;
          y = 0;
          break;
        case 2:
          x = 0;
          y = 0;
          break;
        default:
          console.log("something broke", y);
      }
      break;
    case 1:
      switch (y) {
        case 0:
          x = 2;
          y = 1;
          break;
        case 1:
          x = 1;
          y = 1;
          break;
        case 2:
          x = 0;
          y = 1;
          break;
        case 3:
          x = -1;
          y = 1; //I-block band-aid for now
          break;
        default:
          console.log("something broke", y);
      }
      break;
    case 2:
      switch (y) {
        case 0:
          x = 2;
          y = 2;
          break;
        case 1:
          x = 1;
          y = 2;
          break;
        case 2:
          x = 0;
          y = 2;
          break;
        default:
          console.log("something broke", y);
      }
      break;
    default:
      console.log("something broke", x);
  }
  let isInColisionRotate = props.playingFieldBlocksCords.filter(
    //filters blocks with same cordinates if we move right one block
    (e) =>
      e.left ===
        props.compositeBlockState.left +
          x +
          Math.floor(basicBlockState.playingFieldWidth / 2) -
          2 && e.top === props.compositeBlockState.top + y
  );

  props.compositeBlockState.isInColision.rotation[props.indexkey] =
    !(
      (
        props.compositeBlockState.top + y <
        props.defBlockState.playingFieldHeight - 1
      ) //if it is out of bounds down
    ) ||
    !(
      (
        props.compositeBlockState.left +
          x +
          Math.floor(basicBlockState.playingFieldWidth / 2) -
          2 <
        props.defBlockState.playingFieldWidth
      ) //if it is out of bounds right
    ) ||
    !(
      (
        props.compositeBlockState.left +
          x +
          Math.floor(basicBlockState.playingFieldWidth / 2) >
        +1
      ) //if it is out of bounds left
    ) ||
    isInColisionRotate.length > 0;

  if (
    props.compositeBlockState.rotation !== 0 &&
    props.compositeBlockState.rotation !== basicBlockState.rotation
  ) {
    if (
      props.compositeBlockState.toRotate === true &&
      isInColisionRotate.length < 1
    ) {
      setCompositeBlockOffset({ x, y });
      setBasicBlockState((state) => ({
        ...state,
        rotation: basicBlockState.rotation + 1,
      }));
    }
    if (
      props.compositeBlockState.toRotate === false ||
      isInColisionRotate.length > 0
    ) {
      props.setCompositeBlockState((state) => ({
        ...state,
        rotation: props.compositeBlockState.rotation - 1,
      }));
    }
  }
  useEffect(() => {
    let sendCord = true;
    if (sendCord === true && props.compositeBlockState.toAppend === true) {
      props.playingFieldBlocksCords.push({
        left: calculatedX, //sending cordinates when appending, should happen only once
        top: calculatedY,
        backgroundColor: props.compositeBlock.blockColor,
      });
      setBasicBlockState((state) => ({
        ...state,
        blockRole: "static",
      }));
      setStaticCord((state) => ({
        ...state,
        top: calculatedY,
        left: calculatedX,
      }));
      sendCord = false;
      let row = props.playingFieldBlocksCords.filter(
        (e) => e.top === calculatedY
      );

      if (row.length === props.defBlockState.playingFieldWidth) {
        console.log("deleting row", calculatedY);
        document
          .querySelectorAll(`.row__${calculatedY}`)
          .forEach((e) => e.remove());
        let newCordsArray = props.playingFieldBlocksCords.filter(
          (e) => e.top !== calculatedY
        );
        let moveCordsDown = newCordsArray.map((e) => {
          if (e.top > calculatedY) return e;
          return {
            left: e.left,
            top: e.top + 1,
          };
        });
        console.log(moveCordsDown);
        props.updatePlayingFieldBlocksCords(moveCordsDown);
      }
    }
  }, [calculatedX, calculatedY, props, staticCord]);

  let blockCollisionDown = false;
  let isInColisionDown = props.playingFieldBlocksCords.filter(
    //filters blocks with same cordinates if we move down one block
    (e) => e.left === calculatedX && e.top === calculatedY + 1
  );
  if (isInColisionDown.length > 0) blockCollisionDown = true;
  let gameOverTrigger = props.playingFieldBlocksCords.filter(
    //filters blocks with same cordinates (should only hapen when block spawns inside other existing blocks)
    (e) => e.left === calculatedX && e.top === calculatedY
  );
  if (gameOverTrigger.length > 0) {
    document.querySelectorAll(".basicBlock").forEach((e) => e.remove());
    props.updatePlayingFieldBlocksCords([]);
  }

  props.compositeBlockState.isInColision.down[props.indexkey] =
    !(
      (calculatedY < props.defBlockState.playingFieldHeight - 1) //if it is out of bounds down
    ) || blockCollisionDown;

  let blockCollisionLeft = false;
  let isInColisionLeft = props.playingFieldBlocksCords.filter(
    //filters blocks with same cordinates if we move left one block
    (e) => e.left === calculatedX - 1 && e.top === calculatedY
  );
  if (isInColisionLeft.length > 0) blockCollisionLeft = true;
  props.compositeBlockState.isInColision.left[props.indexkey] =
    !(
      (calculatedX > 0) //if it is out of bounds left
    ) || blockCollisionLeft;

  let blockCollisionRight = false;
  let isInColisionRight = props.playingFieldBlocksCords.filter(
    //filters blocks with same cordinates if we move right one block
    (e) => e.left === calculatedX + 1 && e.top === calculatedY
  );
  if (isInColisionRight.length > 0) blockCollisionRight = true;
  props.compositeBlockState.isInColision.right[props.indexkey] =
    !(
      (calculatedX < props.defBlockState.playingFieldWidth - 1) //if it is out of bounds right
    ) || blockCollisionRight;

  const className = `basicBlock__${props.indexkey} basicBlock row__${calculatedY}`;
  const id_html = `row__${calculatedY} column__${calculatedX}`;
  let style = {};
  if (basicBlockState.blockRole === "moving")
    style = {
      backgroundColor: props.compositeBlock.blockColor,
      height: basicBlockState.basicBlockSize,
      width: basicBlockState.basicBlockSize,
      top: calculatedY * basicBlockState.basicBlockSize,
      left: calculatedX * basicBlockState.basicBlockSize,
    };
  if (basicBlockState.blockRole === "static")
    style = {
      backgroundColor: "white",
      // backgroundColor: props.compositeBlock.blockColor,
      // height: basicBlockState.basicBlockSize,
      // width: basicBlockState.basicBlockSize,
      // top: staticCord.top * basicBlockState.basicBlockSize,
      // left: staticCord.left * basicBlockState.basicBlockSize,
    };
  // console.log(props.playingFieldBlocksCords);
  // console.log(blockRef.current);

  return (
    <div
      ref={blockRef}
      className={className}
      id={id_html}
      indexkey={props.indexkey}
      style={style}
    >
      {props.defBlockState.text}
    </div>
  );
}
