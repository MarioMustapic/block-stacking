import "./Sidebar.styles.scss";

export function Sidebar(props) {
  return (
    <div className="sidebar" style={props.style}>
      <h2>NEXT</h2>
      <div
        className="sidebar__previewNext"
        style={{
          width: `${props.defBlockState.basicBlockSize * 4}px`,
          height: `${props.defBlockState.basicBlockSize * 4}px`,
        }}
      ></div>
      <h2>SCORE</h2>
      <p>{props.defBlockState.score[0]}</p>
      <p>Tetris: {props.defBlockState.score[4]}</p>
      <p>Triple: {props.defBlockState.score[3]}</p>
      <p>Double: {props.defBlockState.score[2]}</p>
      <p>Single: {props.defBlockState.score[1]}</p>
    </div>
  );
}
