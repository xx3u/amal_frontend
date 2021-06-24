import Layout from './Components/Layout/Layout';
import { Route, Switch } from "react-router";
import "./App.css";
import LessonsContainer from "./containers/Lessons/LessonsContainer";
import MainContainer from "./containers/Main/MainContainer";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={MainContainer} />
          <Route path="/lessons" exact component={LessonsContainer} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
