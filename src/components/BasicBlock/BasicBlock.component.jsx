// import { useEffect, useState } from "react";
import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  // console.log(props.compositeBlock);
  // const toAppend = props.defBlockState.to.append;
  // useEffect(() => {
  //   if (toAppend === false) return;
  //   const playingField = document.querySelector(".playingField");
  //   const basicBlock = document.querySelectorAll(".basicBlock");
  //   console.log(basicBlock[0].style);

  //   playingField.append(...basicBlock);
  //   props.defBlockState.to.append = false;
  //   return () => (props.defBlockState.blockType = Math.floor(Math.random() * 7));
  // }, [props.defBlockState, toAppend]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
  };

  let calculatedY = props.compositeBlock.top + props.defBlockState.top;
  let calculatedX = props.compositeBlock.left + props.defBlockState.left;

  props.defBlockState.isInColision.down = !(
    calculatedY <
    (props.defBlockState.playingFieldHeight - 1) *
      props.defBlockState.basicBlockSize
  );
  props.defBlockState.isInColision.right = !(
    calculatedX <
    (props.defBlockState.playingFieldWidth - 1) *
      props.defBlockState.basicBlockSize
  );
  props.defBlockState.isInColision.left = !(
    calculatedX > props.defBlockState.basicBlockSize
  );

  const className = `basicBlock__${props.indexkey} basicBlock`;
  const style = {
    backgroundColor: props.defBlockState.backgroundColor,
    height: props.defBlockState.basicBlockSize,
    width: props.defBlockState.basicBlockSize,
    top: props.compositeBlock.top,
    left: props.compositeBlock.left,
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
