import "./ControlButton.styles.scss";

export function ControlButton(props) {
  let style = {
    top: props.top,
    left: props.left,
  };
  return (
    <button id={props.id} className={props.className} style={style}>
      {props.children}
    </button>
  );
}
