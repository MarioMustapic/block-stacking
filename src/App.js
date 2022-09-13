import "./App.css";
import { BasicBlock } from "./components/BasicBlock/BasicBlock.component";

function App() {
  const move = { top: "0", left: "0" };
  const handleKeyDown = (e, move) => {
    e.preventDefault();
    if (
      e.code !== "ArrowDown" &&
      e.code !== "ArrowLeft" &&
      e.code !== "ArrowRight"
    )
      return;
    else if (e.code === "ArrowDown") return move;
    console.log(e.code);
  };
  return (
    <div className="App" tabIndex={0} onKeyDown={handleKeyDown}>
      <BasicBlock
        backgroundColor={"red"}
        top={`${move.top} vw`}
        left={`${move.left} vw`}
        text={12}
        onClick={handleKeyDown}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default App;

//   make other shapes based on BasicBlock  ?? make one composite and pass it arguments instead of making one by one, that might enable random generation?

//  make movement logic, if posible in same handler or better in separate?

//  make colision logic

//  make pieces "stick" to botom and other pieces that are already "dead"

//  make row complete logic with row remove and upper rows move down

//  game over logic

//  score?
