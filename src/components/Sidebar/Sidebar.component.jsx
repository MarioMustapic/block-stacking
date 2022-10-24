import { DefState } from "../../models/DefState";
import "./Sidebar.styles.scss";

export function Sidebar(props) {
  console.log(DefState);

  return (
    <div
      className="sidebar"
      //   style={{
      //     width: `${state.basicBlockSize * state.playingFieldWidth}px`,
      //     height: `${state.basicBlockSize * state.playingFieldHeight}px`,
      //   }}
    ></div>
  );
}
