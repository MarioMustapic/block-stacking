// import { useEffect, useState } from "react";
import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  // console.log(props.compositeBlock);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
  };
  let calculatedY = props.compositeBlock.top + props.blockState.top;
  let calculatedX = props.compositeBlock.left + props.blockState.left;

  props.blockState.isInColision.down = !(
    calculatedY <
    (props.blockState.playingFieldHeight - 1) * props.blockState.basicBlockSize
  );
  props.blockState.isInColision.right = !(
    calculatedX <
    (props.blockState.playingFieldWidth - 1) * props.blockState.basicBlockSize
  );
  props.blockState.isInColision.left = !(
    calculatedX > props.blockState.basicBlockSize
  );

  const className = `basicBlock__${props.indexkey} basicBlock`;
  const style = {
    backgroundColor: props.blockState.backgroundColor,
    height: props.blockState.basicBlockSize,
    width: props.blockState.basicBlockSize,
    top: props.compositeBlock.top,
    left: props.compositeBlock.left,
  };

  return (
    <div
      className={className}
      indexkey={props.indexkey}
      style={style}
      onKeyDown={props.onKeyDown}
      onClick={handleClick}
    >
      {props.blockState.text}
    </div>
  );
}
