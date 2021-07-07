import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout/Layout';
import LessonsContainer from './containers/Lessons/LessonsContainer';
import MainContainer from './containers/Main/MainContainer';
import StudentForm from './containers/Forms/StudentForm';
import StudentsPage from './pages/StudentsPage/StudentsPage';
import GroupsPage from './pages/GroupsPage/GroupsPage';

function App() {
  return (
    <div className='App'>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route path='/' exact component={MainContainer} />
          <Route path='/lessons' exact component={LessonsContainer} />
          <Route path='/admin-app/students/add' exact component={StudentForm} />
          <Route path='/admin-app/students' exact component={StudentsPage} />
          <Route path='/admin-app/groups' exact component={GroupsPage} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
