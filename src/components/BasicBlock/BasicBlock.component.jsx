import "./BasicBlock.styles.scss";

export function BasicBlock(props) {
  const style = {
    backgroundColor: props.backgroundColor,
    top: props.top,
    left: props.left,
  };

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
