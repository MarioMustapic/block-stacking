import "./Sidebar.styles.scss";

export function Sidebar(props) {
  const nextBlockList = [
    [[1, 1, 1, 1], [0, 1, 2, 3], "red", "evenLength", "I-block"],
    [[0.5, 1.5, 0.5, 1.5], [0, 0, 1, 1], "yellow", "evenLength", "O-block"],
    [[1, 1, 1, 2], [1, 0, 2, 2], "blue", "unEvenLength", "L-Block"],
    [[1, 1, 1, 0], [1, 0, 2, 2], "orange", "unEvenLength", "J-block"],
    [[1, 0, 1, 2], [1, 1, 0, 1], "green", "unEvenLength", "T-block"],
    [[1, 1, 0, 2], [1, 0, 0, 1], "teal", "unEvenLength", "Z-block"],
    [[1, 1, 2, 0], [1, 0, 0, 1], "pink", "unEvenLength", "S-block"],
  ];
  const offsetX = nextBlockList[props.defBlockState.blockType.next][0];
  const offsetY = nextBlockList[props.defBlockState.blockType.next][1];
  const blockColor = nextBlockList[props.defBlockState.blockType.next][2];

  let style = [
    {
      width: `${props.defBlockState.basicBlockSize}px`,
      height: `${props.defBlockState.basicBlockSize}px`,
      top: (1.5 + offsetY[0]) * props.defBlockState.basicBlockSize,
      left: (1.5 + offsetX[0]) * props.defBlockState.basicBlockSize,
      backgroundColor: blockColor,
    },
    {
      width: `${props.defBlockState.basicBlockSize}px`,
      height: `${props.defBlockState.basicBlockSize}px`,
      top: (1.5 + offsetY[1]) * props.defBlockState.basicBlockSize,
      left: (1.5 + offsetX[1]) * props.defBlockState.basicBlockSize,
      backgroundColor: blockColor,
    },
    {
      width: `${props.defBlockState.basicBlockSize}px`,
      height: `${props.defBlockState.basicBlockSize}px`,
      top: (1.5 + offsetY[2]) * props.defBlockState.basicBlockSize,
      left: (1.5 + offsetX[2]) * props.defBlockState.basicBlockSize,
      backgroundColor: blockColor,
    },
    {
      width: `${props.defBlockState.basicBlockSize}px`,
      height: `${props.defBlockState.basicBlockSize}px`,
      top: (1.5 + offsetY[3]) * props.defBlockState.basicBlockSize,
      left: (1.5 + offsetX[3]) * props.defBlockState.basicBlockSize,
      backgroundColor: blockColor,
    },
  ];
  return (
    <div className="sidebar" style={props.style}>
      <h2>NEXT</h2>
      <div
        className="sidebar__previewNext"
        style={{
          width: `${props.defBlockState.basicBlockSize * 4}px`,
          height: `${props.defBlockState.basicBlockSize * 4}px`,
        }}
      >
        <div className="nextBlock" style={style[0]}></div>
        <div className="nextBlock" style={style[1]}></div>
        <div className="nextBlock" style={style[2]}></div>
        <div className="nextBlock" style={style[3]}></div>
      </div>
      <h2>SCORE</h2>
      <p>{props.defBlockState.score[0]}</p>
      <p>Tetris: {props.defBlockState.score[4]}</p>
      <p>Triple: {props.defBlockState.score[3]}</p>
      <p>Double: {props.defBlockState.score[2]}</p>
      <p>Single: {props.defBlockState.score[1]}</p>
    </div>
  );
}
