import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout/Layout';
import LessonsContainer from './containers/Lessons/LessonsContainer';
import StudentsPage from './pages/StudentsPage/StudentsPage';
import GroupsPage from './pages/GroupsPage/GroupsPage';
import CreateStudentForm from './containers/Forms/Student/CreateStudentForm';
import EditStudentForm from './containers/Forms/Student/EditStudentForm';
import StudentDetailPage from './pages/StudentDetailPage/StudentDetailPage';
import PaymentsPage from './pages/PaymentsPage/PaymentsPage';
import TeachersPage from './pages/TeachersPage/TeachersPage';

function App() {
  return (
    <div className='App'>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route path='/lessons' exact component={LessonsContainer} />
          <Route path='/admin-app/students/:id/edit' exact component={EditStudentForm} />
          <Route path='/admin-app/students/add' exact component={CreateStudentForm} />
          <Route path='/admin-app/groups' exact component={GroupsPage} />
          <Route path='/admin-app/students/:id' exact component={StudentDetailPage} />
          <Route path={['/admin-app/students', '/']} exact component={StudentsPage} />
          <Route path='/admin-app/payments' exact component={PaymentsPage} />
          <Route path='/admin-app/teachers' exact component={TeachersPage} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
