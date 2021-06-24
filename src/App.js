import { Route, Switch } from "react-router";
import "./App.css";
import LessonsContainer from "./containers/Lessons/LessonsContainer";
import MainContainer from "./containers/Main/MainContainer";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={MainContainer} />
        <Route path="/lessons" exact component={LessonsContainer} />
      </Switch>
    </div>
  );
}

export default App;
