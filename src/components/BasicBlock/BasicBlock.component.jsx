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

  props.compositeBlockState.isInColision.down[props.indexkey] = !(
    calculatedY <
    props.defBlockState.playingFieldHeight - 1
  );
  props.compositeBlockState.isInColision.right[props.indexkey] = !(
    calculatedX <
    props.defBlockState.playingFieldWidth - 1
  );
  props.compositeBlockState.isInColision.left[props.indexkey] = !(
    calculatedX > 0
  );

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
