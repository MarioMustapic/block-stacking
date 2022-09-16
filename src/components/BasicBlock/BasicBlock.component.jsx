import { useEffect } from "react";
import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  const colisionDetection = () => {
    let compositeBlockColision1 = document.querySelector(".basicBlock");
    console.log(compositeBlockColision1);
    let rect = compositeBlockColision1.getBoundingClientRect();
    console.log(rect);
  };
  const style = {
    backgroundColor: props.blockState.backgroundColor,
    height: props.blockState.basicBlockSize,
    width: props.blockState.basicBlockSize,
    top: props.compositeBlock.top,
    left: props.compositeBlock.left,
  };
  useEffect(() => {
    colisionDetection();
  }, []);
  return (
    <div
      className="basicBlock"
      style={style}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
    >
      {props.blockState.text}
    </div>
  );
}
