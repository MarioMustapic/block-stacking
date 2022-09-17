import { useEffect, useState } from "react";
import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  const [blockCords, setblockCords] = useState({
    top: "",
    left: "",
    y: "top",
    x: "left",
  });
  const className = `basicBlock__${props.indexkey} basicBlock`;
  const style = {
    backgroundColor: props.blockState.backgroundColor,
    height: props.blockState.basicBlockSize,
    width: props.blockState.basicBlockSize,
    top: props.compositeBlock.top,
    left: props.compositeBlock.left,
  };

  function cords() {
    const blockColision = document.querySelector(
      `.basicBlock__${[props.indexkey]}`
    );
    const xCord = blockColision.getBoundingClientRect().x;
    const yCord = blockColision.getBoundingClientRect().y;
    setblockCords((blockCords) => ({
      ...blockCords,
      [blockCords.y]: yCord,
      [blockCords.x]: xCord,
    }));
  }
  useEffect(() => {
    cords();
  });
  console.log(blockCords);
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
