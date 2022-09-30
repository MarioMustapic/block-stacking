import { useEffect } from "react";
import { useState } from "react";
import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  const [basicBlockState] = useState(props.compositeBlockState);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
  };

  let calculatedY = props.compositeBlockState.top + props.compositeBlock.top;
  let calculatedX =
    props.compositeBlockState.left +
    props.compositeBlock.left +
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
    backgroundColor: props.compositeBlock.backgroundColor,
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
