import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  const [basicBlockState] = useState(props.compositeBlockState);
  // const [rotationOffset, setCompositeBlockOffset] = useState({ x: 0, y: 0 });
  const [compositeBlockOffset, setCompositeBlockOffset] = useState({
    x: props.compositeBlock.x,
    y: props.compositeBlock.y,
  });
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
  };

  let x = compositeBlockOffset.x;
  let y = compositeBlockOffset.y;
  console.log({ x, y, c: props.indexkey });
  const rotation = useCallback(() => {
    if (
      /// droping compositeBlocks without block as center of rotation
      props.compositeBlock.length !== "unEvenLength" ||
      props.compositeBlockState.rotation % 4 === 0 //4th rotation is same as starting position so we start over
    )
      return;
    else if (props.compositeBlockState.rotation % 4 !== 0) {
      switch (x) {
        case 0:
          switch (y) {
            case 0:
              setCompositeBlockOffset({ x: 2, y: 0 });
              break;
            case 1:
              setCompositeBlockOffset({ x: 1, y: 0 });
              break;
            case 2:
              setCompositeBlockOffset({ x: 0, y: 0 });
              break;
            default:
              console.log("something broke", y);
          }
          break;
        case 1:
          switch (y) {
            case 0:
              setCompositeBlockOffset({ x: 2, y: 1 });
              break;
            case 1:
              setCompositeBlockOffset({ x: 1, y: 1 });
              break;
            case 2:
              setCompositeBlockOffset({ x: 0, y: 1 });
              break;
            default:
              console.log("something broke", y);
          }
          break;
        case 2:
          switch (y) {
            case 0:
              setCompositeBlockOffset({ x: 2, y: 2 });
              break;
            case 1:
              setCompositeBlockOffset({ x: 1, y: 2 });
              break;
            case 2:
              setCompositeBlockOffset({ x: 0, y: 2 });
              break;
            default:
              console.log("something broke", y);
          }
          break;
        default:
          console.log("something broke", x);
      }
    }
  }, [props.compositeBlockState.rotation, props.compositeBlock.length, x, y]);
  useEffect(() => {
    if (props.compositeBlockState.rotation !== 0) {
      let abc = document.querySelector(".basicBlock");
      abc.dispatchEvent(new Event("rotate"));
    }
  }, [props.compositeBlockState.rotation]);
  useEffect(() => {
    const compositeBlock = document.querySelector(".basicBlock");
    compositeBlock.addEventListener("rotate", (e) => {
      rotation();
    });
  });

  let calculatedY = props.compositeBlockState.top + compositeBlockOffset.y;
  let calculatedX =
    props.compositeBlockState.left +
    compositeBlockOffset.x +
    Math.floor(basicBlockState.playingFieldWidth / 2);

  useEffect(() => {
    let sendCord = true;
    if (sendCord === true && props.compositeBlockState.toAppend === true) {
      props.playingFieldBlocksCords.push({
        left: calculatedX, //sending cordinates when appending, should happen only once
        top: calculatedY,
      });
      sendCord = false;
    }
  }, [calculatedX, calculatedY, props]);

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
    props.updatePlayingFieldBlocksCords([]);
    document.querySelectorAll(".basicBlock").forEach((e) => e.remove());
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

  const className = `basicBlock__${props.indexkey} basicBlock`;
  const style = {
    backgroundColor: props.compositeBlock.blockColor,
    height: basicBlockState.basicBlockSize,
    width: basicBlockState.basicBlockSize,
    top: calculatedY * basicBlockState.basicBlockSize,
    left: calculatedX * basicBlockState.basicBlockSize,
  };

  return (
    <div
      className={className}
      indexkey={props.indexkey}
      style={style}
      onClick={handleClick}
    >
      {props.defBlockState.text}
    </div>
  );
}
