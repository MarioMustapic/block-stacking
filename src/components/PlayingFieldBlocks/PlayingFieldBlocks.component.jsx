import { useRef } from "react";
import "./PlayingFieldBlocks.styles.scss";

export function PlayingFieldBlock(props) {
  const playingFieldBlockRef = useRef(null);

  const className = `playingFieldBlock__${props.indexkey} playingFieldBlock`;

  let style = {
    backgroundColor: props.playingFieldBlock.backgroundColor,
    height: props.defBlockState.basicBlockSize,
    width: props.defBlockState.basicBlockSize,
    top: props.playingFieldBlock.top * props.defBlockState.basicBlockSize,
    left: props.playingFieldBlock.left * props.defBlockState.basicBlockSize,
  };

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
