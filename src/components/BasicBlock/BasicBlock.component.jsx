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

  // props.updatePlayingFieldBlocksCords(() => ({
  //   ...props.playingFieldBlocksCords.blocks,
  //   top:calculatedX,
  //   left: calculatedY
  // }));

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

  props.compositeBlockState.isInColision.down[props.indexkey] = !(
    (calculatedY < props.defBlockState.playingFieldHeight - 1) //if it is out of bounds down
  ); //&& blockCollisionDown;

  props.compositeBlockState.isInColision.right[props.indexkey] = !(
    (calculatedX < props.defBlockState.playingFieldWidth - 1) //if it is out of bounds right
  ); //&& blockCollisionDown;

  props.compositeBlockState.isInColision.left[props.indexkey] = !(
    (calculatedX > 0) //if it is out of bounds left
  ); //&& blockCollisionDown;

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
