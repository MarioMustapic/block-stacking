import { BasicBlock } from "../BasicBlock/BasicBlock.component";
import "./CompositeBlock.styles.scss";

export function CompositeBlock(props) {
  const style = {
    backgroundColor: props.blockState.backgroundColor,
    top: props.blockState.top,
    left: props.blockState.left,
    height: props.blockState.basicBlockSize * 2,
    width: props.blockState.basicBlockSize * 2,
  };
  return (
    <div
      className="compositeBlock"
      style={style}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
    >
      <BasicBlock blockState={props.blockState} />
    </div>
  );
}
