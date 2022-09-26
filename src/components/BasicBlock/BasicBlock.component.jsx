import { useState } from "react";
import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  const [basicBlockState] = useState(props.compositeBlockState);

  // console.log(basicBlockState);
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

  let calculatedY = props.compositeBlockState.top + props.compositeBlock.top;
  let calculatedX =
    props.compositeBlock.left +
    Math.floor(basicBlockState.playingFieldWidth / 2);

  console.log(calculatedY, calculatedX);

  props.defBlockState.isInColision.down = !(
    calculatedY <
    props.defBlockState.playingFieldHeight - 1
  );
  props.defBlockState.isInColision.right = !(
    calculatedX <
    props.defBlockState.playingFieldWidth - 1
  );
  props.defBlockState.isInColision.left = !(calculatedX > 0);

  const className = `basicBlock__${props.indexkey} basicBlock`;
  const style = {
    backgroundColor: basicBlockState.backgroundColor,
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
