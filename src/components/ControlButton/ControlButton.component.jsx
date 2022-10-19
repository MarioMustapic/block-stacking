import "./ControlButton.styles.scss";

export function ControlButton(props) {
  let style = {
    // top: props.top,
    // left: props.left,
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
