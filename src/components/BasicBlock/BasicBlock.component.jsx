import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
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
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
    >
      {props.blockState.text}
    </div>
  );
}
