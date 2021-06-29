import React from "react";
import { Route, Switch } from "react-router";
import Layout from './components/Layout/Layout';
import LessonsContainer from "./containers/Lessons/LessonsContainer";
import MainContainer from "./containers/Main/MainContainer";
import StudentForm from './containers/Forms/StudentForm';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={MainContainer} />
          <Route path="/lessons" exact component={LessonsContainer} />
          <Route path="/students/create-form" exact component={StudentForm} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
