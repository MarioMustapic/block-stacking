import "./Sidebar.styles.scss";

export function Sidebar(props) {
  return (
    <div className="sidebar" style={props.style}>
      <h2>NEXT</h2>
      <div className="sidebar__previewNext"></div>
      <h2>SCORE</h2>
      <p>#PH1</p>
      <p>Tetris:#ph2</p>
      <p>Triple:#ph3</p>
      <p>Double:#ph4</p>
      <p>Single:#ph5</p>
    </div>
  );
}
