import { useRef } from "react";
import { useState } from "react";
import "./PlayingFieldBlocks.styles.scss";

export function PlayingFieldBlock(props) {
  const playingFieldBlockRef = useRef(null);
  const [playingFieldBlockState] = useState(props.playingFieldBlock);
  // console.log(playingFieldBlockState, props.indexkey);

  // const [staticCord, setStaticCord] = useState({});
  // const [compositeBlockOffset, setCompositeBlockOffset] = useState({
  //   x: props.compositeBlock.x,
  //   y: props.compositeBlock.y,
  // });

  // useEffect(() => {
  //   if (playingFieldBlockState.blockRole === "")
  //     setPlayingFieldBlock((state) => ({
  //       ...state,
  //       blockRole: "moving",
  //     }));
  // }, [playingFieldBlockState.blockRole]);

  // useEffect(() => {
  //   if (playingFieldBlockState.blockRole === "static")
  //     setPlayingFieldBlock((state) => ({
  //       ...state,
  //       blockRole: "static",
  //     }));
  // }, [playingFieldBlockState.blockRole]);

  // let calculatedY = props.defBlockState.top + compositeBlockOffset.y;
  // let calculatedX =
  //   props.defBlockState.left +
  //   compositeBlockOffset.x +
  //   Math.floor(playingFieldBlockState.playingFieldWidth / 2) -
  //   2;

  // let x = compositeBlockOffset.x;
  // let y = compositeBlockOffset.y;
  // // let blockCollisionRotate = false;

  // switch (x) {
  //   case -1:
  //     x = 1;
  //     y = 3; //I-block band-aid for now
  //     break;
  //   case 0:
  //     switch (y) {
  //       case 0:
  //         x = 2;
  //         y = 0;
  //         break;
  //       case 1:
  //         x = 1;
  //         y = 0;
  //         break;
  //       case 2:
  //         x = 0;
  //         y = 0;
  //         break;
  //       default:
  //         console.log("something broke", y);
  //     }
  //     break;
  //   case 1:
  //     switch (y) {
  //       case 0:
  //         x = 2;
  //         y = 1;
  //         break;
  //       case 1:
  //         x = 1;
  //         y = 1;
  //         break;
  //       case 2:
  //         x = 0;
  //         y = 1;
  //         break;
  //       case 3:
  //         x = -1;
  //         y = 1; //I-block band-aid for now
  //         break;
  //       default:
  //         console.log("something broke", y);
  //     }
  //     break;
  //   case 2:
  //     switch (y) {
  //       case 0:
  //         x = 2;
  //         y = 2;
  //         break;
  //       case 1:
  //         x = 1;
  //         y = 2;
  //         break;
  //       case 2:
  //         x = 0;
  //         y = 2;
  //         break;
  //       default:
  //         console.log("something broke", y);
  //     }
  //     break;
  //   default:
  //     console.log("something broke", x);
  // }
  // let isInColisionRotate = props.playingFieldBlocksCords.filter(
  //   //filters blocks with same cordinates if we move right one block
  //   (e) =>
  //     e.left ===
  //       props.defBlockState.left +
  //         x +
  //         Math.floor(playingFieldBlockState.playingFieldWidth / 2) -
  //         2 && e.top === props.defBlockState.top + y
  // );

  // props.defBlockState.isInColision.rotation[props.indexkey] =
  //   !(
  //     (props.defBlockState.top + y < props.defBlockState.playingFieldHeight - 1) //if it is out of bounds down
  //   ) ||
  //   !(
  //     (
  //       props.defBlockState.left +
  //         x +
  //         Math.floor(playingFieldBlockState.playingFieldWidth / 2) -
  //         2 <
  //       props.defBlockState.playingFieldWidth
  //     ) //if it is out of bounds right
  //   ) ||
  //   !(
  //     (
  //       props.defBlockState.left +
  //         x +
  //         Math.floor(playingFieldBlockState.playingFieldWidth / 2) >
  //       +1
  //     ) //if it is out of bounds left
  //   ) ||
  //   isInColisionRotate.length > 0;

  // if (
  //   props.defBlockState.rotation !== 0 &&
  //   props.defBlockState.rotation !== playingFieldBlockState.rotation
  // ) {
  //   if (
  //     props.defBlockState.toRotate === true &&
  //     isInColisionRotate.length < 1
  //   ) {
  //     setCompositeBlockOffset({ x, y });
  //     setPlayingFieldBlock((state) => ({
  //       ...state,
  //       rotation: playingFieldBlockState.rotation + 1,
  //     }));
  //   }
  //   if (
  //     props.defBlockState.toRotate === false ||
  //     isInColisionRotate.length > 0
  //   ) {
  //     props.setdefBlockState((state) => ({
  //       ...state,
  //       rotation: props.defBlockState.rotation - 1,
  //     }));
  //   }
  // }
  // useEffect(() => {
  //   let sendCord = true;
  //   if (sendCord === true && props.defBlockState.toAppend === true) {
  //     props.playingFieldBlocksCords.push({
  //       left: calculatedX, //sending cordinates when appending, should happen only once
  //       top: calculatedY,
  //     });
  //     setPlayingFieldBlock((state) => ({
  //       ...state,
  //       blockRole: "static",
  //     }));
  //     setStaticCord((state) => ({
  //       ...state,
  //       top: calculatedY,
  //       left: calculatedX,
  //     }));
  //     sendCord = false;
  //     let row = props.playingFieldBlocksCords.filter(
  //       (e) => e.top === calculatedY
  //     );

  //     if (row.length === props.defBlockState.playingFieldWidth) {
  //       console.log("deleting row", calculatedY);
  //       document
  //         .querySelectorAll(`.row__${calculatedY}`)
  //         .forEach((e) => e.remove());
  //       let newCordsArray = props.playingFieldBlocksCords.filter(
  //         (e) => e.top !== calculatedY
  //       );
  //       let moveCordsDown = newCordsArray.map((e) => {
  //         if (e.top > calculatedY) return e;
  //         return {
  //           left: e.left,
  //           top: e.top + 1,
  //         };
  //       });
  //       console.log(moveCordsDown);
  //       props.updatePlayingFieldBlocksCords(moveCordsDown);
  //     }
  //   }
  // }, [calculatedX, calculatedY, props, staticCord]);

  // let blockCollisionDown = false;
  // let isInColisionDown = props.playingFieldBlocksCords.filter(
  //   //filters blocks with same cordinates if we move down one block
  //   (e) => e.left === calculatedX && e.top === calculatedY + 1
  // );
  // if (isInColisionDown.length > 0) blockCollisionDown = true;
  // let gameOverTrigger = props.playingFieldBlocksCords.filter(
  //   //filters blocks with same cordinates (should only hapen when block spawns inside other existing blocks)
  //   (e) => e.left === calculatedX && e.top === calculatedY
  // );
  // if (gameOverTrigger.length > 0) {
  //   document.querySelectorAll(".basicBlock").forEach((e) => e.remove());
  //   props.updatePlayingFieldBlocksCords([]);
  // }

  // props.defBlockState.isInColision.down[props.indexkey] =
  //   !(
  //     (calculatedY < props.defBlockState.playingFieldHeight - 1) //if it is out of bounds down
  //   ) || blockCollisionDown;

  // let blockCollisionLeft = false;
  // let isInColisionLeft = props.playingFieldBlocksCords.filter(
  //   //filters blocks with same cordinates if we move left one block
  //   (e) => e.left === calculatedX - 1 && e.top === calculatedY
  // );
  // if (isInColisionLeft.length > 0) blockCollisionLeft = true;
  // props.defBlockState.isInColision.left[props.indexkey] =
  //   !(
  //     (calculatedX > 0) //if it is out of bounds left
  //   ) || blockCollisionLeft;

  // let blockCollisionRight = false;
  // let isInColisionRight = props.playingFieldBlocksCords.filter(
  //   //filters blocks with same cordinates if we move right one block
  //   (e) => e.left === calculatedX + 1 && e.top === calculatedY
  // );
  // if (isInColisionRight.length > 0) blockCollisionRight = true;
  // props.defBlockState.isInColision.right[props.indexkey] =
  //   !(
  //     (calculatedX < props.defBlockState.playingFieldWidth - 1) //if it is out of bounds right
  //   ) || blockCollisionRight;

  const className = `playingFieldBlock__${props.indexkey} playingFieldBlock`;
  // let style = {};
  // if (playingFieldBlockState.blockRole === "moving")
  //   style = {
  //     backgroundColor: props.compositeBlock.blockColor,
  //     height: playingFieldBlockState.basicBlockSize,
  //     width: playingFieldBlockState.basicBlockSize,
  //     top: calculatedY * playingFieldBlockState.basicBlockSize,
  //     left: calculatedX * playingFieldBlockState.basicBlockSize,
  //   };
  // if (playingFieldBlockState.blockRole === "static")
  let style = {
    backgroundColor: playingFieldBlockState.backgroundColor,
    height: props.defBlockState.basicBlockSize,
    width: props.defBlockState.basicBlockSize,
    top: playingFieldBlockState.top * props.defBlockState.basicBlockSize,
    left: playingFieldBlockState.left * props.defBlockState.basicBlockSize,
    // height: playingFieldBlockState.basicBlockSize,
    // width: playingFieldBlockState.basicBlockSize,
    // top: staticCord.top * playingFieldBlockState.basicBlockSize,
    // left: staticCord.left * playingFieldBlockState.basicBlockSize,
  };
  // console.log(props.playingFieldBlocksCords);
  // console.log(blockRef.current);
  return (
    <div
      ref={playingFieldBlockRef}
      className={className}
      indexkey={props.indexkey}
      style={style}
    >
      {props.defBlockState.text}
    </div>
  );
}
