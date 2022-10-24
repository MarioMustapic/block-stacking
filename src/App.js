import "./App.css";
import { PlayingField } from "./components/PlayingField/PlayingField.component";
import { Sidebar } from "./components/Sidebar/Sidebar.component";

function App() {
  return (
    <div className="App">
      <div className="gameWrapper">
        <PlayingField />
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
