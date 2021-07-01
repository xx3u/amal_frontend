import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch } from "react-router";
import Layout from "./components/Layout/Layout";
import LessonsContainer from "./containers/Lessons/LessonsContainer";
import MainContainer from "./containers/Main/MainContainer";

function App() {
  return (
    <div className="App">
      <CssBaseline />
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
