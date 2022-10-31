import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  const blockRef = useRef(null);
  const [basicBlockState, setBasicBlockState] = useState(
    props.compositeBlockState
  );
  const [compositeBlockOffset, setCompositeBlockOffset] = useState({
    x: props.compositeBlock.x,
    y: props.compositeBlock.y,
  });

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
  let isInCollisionRotate = props.playingFieldBlocksCords.filter(
    //filters blocks with same coordinates if we move right one block
    (e) =>
      e.left ===
        props.compositeBlockState.left +
          x +
          Math.floor(basicBlockState.playingFieldWidth / 2) -
          2 && e.top === props.compositeBlockState.top + y
  );

  props.compositeBlockState.isInCollision.rotation[props.indexkey] =
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
    isInCollisionRotate.length > 0;

  if (
    props.compositeBlockState.rotation !== 0 &&
    props.compositeBlockState.rotation !== basicBlockState.rotation
  ) {
    if (
      props.compositeBlockState.toRotate === true &&
      isInCollisionRotate.length < 1
    ) {
      setCompositeBlockOffset({ x, y });
      setBasicBlockState((state) => ({
        ...state,
        rotation: basicBlockState.rotation + 1,
      }));
    }
    if (
      props.compositeBlockState.toRotate === false ||
      isInCollisionRotate.length > 0
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
        left: calculatedX, //sending coordinates when appending, should happen only once
        top: calculatedY,
        backgroundColor: props.compositeBlock.blockColor,
      });
      let duplicateRows = 0;
      props.rowsToCheck.forEach((e) => {
        if (e === calculatedY) duplicateRows++;
      });
      if (duplicateRows === 0) props.rowsToCheck.push(calculatedY);

      sendCord = false;
    }
  }, [calculatedX, calculatedY, props]);

  let blockCollisionDown = false;
  let isInCollisionDown = props.playingFieldBlocksCords.filter(
    //filters blocks with same coordinates if we move down one block
    (e) => e.left === calculatedX && e.top === calculatedY + 1
  );
  if (isInCollisionDown.length > 0) blockCollisionDown = true;

  props.compositeBlockState.isInCollision.down[props.indexkey] =
    !(
      (calculatedY < props.defBlockState.playingFieldHeight - 1) //if it is out of bounds down
    ) || blockCollisionDown;

  let blockCollisionLeft = false;
  let isInCollisionLeft = props.playingFieldBlocksCords.filter(
    //filters blocks with same coordinates if we move left one block
    (e) => e.left === calculatedX - 1 && e.top === calculatedY
  );
  if (isInCollisionLeft.length > 0) blockCollisionLeft = true;
  props.compositeBlockState.isInCollision.left[props.indexkey] =
    !(
      (calculatedX > 0) //if it is out of bounds left
    ) || blockCollisionLeft;

  let blockCollisionRight = false;
  let isInCollisionRight = props.playingFieldBlocksCords.filter(
    //filters blocks with same coordinates if we move right one block
    (e) => e.left === calculatedX + 1 && e.top === calculatedY
  );
  if (isInCollisionRight.length > 0) blockCollisionRight = true;
  props.compositeBlockState.isInCollision.right[props.indexkey] =
    !(
      (calculatedX < props.defBlockState.playingFieldWidth - 1) //if it is out of bounds right
    ) || blockCollisionRight;

  let gameOverTrigger = props.playingFieldBlocksCords.filter(
    //filters blocks with same coordinates (should only happen when block spawns inside other existing blocks)
    (e) => e.left === calculatedX && e.top === calculatedY
  );
  if (gameOverTrigger.length > 0) {
    props.updatePlayingFieldBlocksCords([]);
    props.setDefBlockState((state) => ({
      ...state,
      score: [0, 0, 0, 0, 0],
    }));
  }

  const className = `basicBlock__${props.indexkey} basicBlock row__${calculatedY}`;
  const id_html = `row__${calculatedY} column__${calculatedX}`;

  let style = {
    backgroundColor: props.compositeBlock.blockColor,
    height: props.defBlockState.basicBlockSize,
    width: props.defBlockState.basicBlockSize,
    top: calculatedY * props.defBlockState.basicBlockSize,
    left: calculatedX * props.defBlockState.basicBlockSize,
  };

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
