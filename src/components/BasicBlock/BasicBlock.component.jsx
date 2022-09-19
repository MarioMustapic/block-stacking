import { useEffect, useState } from "react";
import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  const [initialBlockCords, setblockCords] = useState({
    top: "",
    left: "",
    y: "top",
    x: "left",
  });
  let calculatedTop = initialBlockCords.top + props.blockState.top;
  let calculatedLeft = initialBlockCords.left + props.blockState.left;
  console.log(props.blockState.isInColision);
  props.blockState.isInColision = !(calculatedTop < 540);
  props.blockState.isInColision = !(calculatedLeft < 540);
  console.log(props.blockState.isInColision);
  console.log(calculatedTop);
  console.log(calculatedLeft);
  const className = `basicBlock__${props.indexkey} basicBlock`;
  const style = {
    backgroundColor: props.blockState.backgroundColor,
    height: props.blockState.basicBlockSize,
    width: props.blockState.basicBlockSize,
    top: props.compositeBlock.top,
    left: props.compositeBlock.left,
  };

  useEffect(() => {
    const blockColision = document.querySelector(
      `.basicBlock__${[props.indexkey]}`
    );
    const xCord = blockColision.getBoundingClientRect().x;
    const yCord = blockColision.getBoundingClientRect().y;
    setblockCords((initialBlockCords) => ({
      ...initialBlockCords,
      [initialBlockCords.y]: yCord,
      [initialBlockCords.x]: xCord,
    }));
  }, [props.indexkey]);

  return (
    <div
      className={className}
      indexkey={props.indexkey}
      style={style}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
    >
      {props.blockState.text}
    </div>
  );
}
