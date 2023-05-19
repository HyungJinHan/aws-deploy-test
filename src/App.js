import "./App.css";
import CounterContainer from "./containers/CounterContainer";
import PaletteContainer from "./containers/PaletteContainer";
import WaitingListContainer from "./containers/WaitingListContainer";

function App() {
  return (
    <div className="App">
      <PaletteContainer />
      <CounterContainer />
      <WaitingListContainer />
    </div>
  );
}

export default App;
