import "./ControlButton.styles.scss";

export function ControlButton(props) {
  let style = {
    height: props.defBlockState.basicBlockSize * 2,
    width: props.defBlockState.basicBlockSize * 4,
    backgroundColor: props.backgroundColor,
  };
  return (
    <div
      id={props.id}
      className={props.className}
      style={style}
      onPointerDown={props.handleOnPointerDown}
    >
      {props.children}
    </div>
  );
}
