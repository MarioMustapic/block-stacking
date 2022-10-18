import "./App.css";
import { ControlsField } from "./components/ControlsField/ControlsField.component";
import { PlayingField } from "./components/PlayingField/PlayingField.component";

function App() {
  return (
    <div className="App">
      <PlayingField />
      <ControlsField/>
    </div>
  );
}

export default App;

//   make other shapes based on BasicBlock  ?? make one composite and pass it arguments instead of making one by one, that might enable random generation?

//  make movement logic, if posible in same handler or better in separate?
//  add rotation
//  and add block droping down ("gravity")

//  make colision logic

//  make pieces "stick" to botom and other pieces that are already "dead"

//  make row complete logic with row remove and upper rows move down

//  game over logic

//  score?
