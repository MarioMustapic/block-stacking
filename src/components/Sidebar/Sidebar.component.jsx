import { DefState } from "../../models/DefState";
import "./Sidebar.styles.scss";

export function Sidebar(props) {
  let scaleCoef = 21; //scaling factor for basicBlockSize
  if ("ontouchstart" in document.documentElement === true) scaleCoef = 28;
  let newBasicBlockSize = Math.floor(window.innerHeight / scaleCoef);

  const defState = new DefState({ basicBlockSize: newBasicBlockSize });
  console.log(defState);
  return (
    <div
      className="sidebar"
      style={{
        width: `${defState.basicBlockSize * 6}px`,
        height: `${defState.basicBlockSize * defState.playingFieldHeight}px`,
      }}
    ></div>
  );
}
