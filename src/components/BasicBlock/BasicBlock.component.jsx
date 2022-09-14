import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  const style = {
    backgroundColor: props.backgroundColor,
    height: props.blockState.basicBlockSize,
    width: props.blockState.basicBlockSize,
  };
  console.log(props.blockState.basicBlockSize);
  return (
    <div
      className="basicBlock"
      style={style}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
    >
      {props.text}
    </div>
  );
}
