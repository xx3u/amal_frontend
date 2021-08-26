import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import StudentsPage from './pages/StudentsPage/StudentsPage';
import GroupsPage from './pages/GroupsPage/GroupsPage';
import CreateStudentForm from './containers/Forms/Student/CreateStudentForm';
import EditStudentForm from './containers/Forms/Student/EditStudentForm';
import StudentDetailPage from './pages/StudentDetailPage/StudentDetailPage';
import PaymentsPage from './pages/PaymentsPage/PaymentsPage';
import TeachersPage from './pages/TeachersPage/TeachersPage';
import CreateTeacherForm from './containers/Forms/Teacher/CreateTeacherForm';
import EditTeacherForm from './containers/Forms/Teacher/EditTeacherForm';
import PaymentsByStudent from './pages/PaymentsByStudent/PaymentsByStudent';
import LessonsPage from './pages/LessonsPage/LessonsPage';
import LessonsByTeacher from './containers/LessonsByTeacher/LessonsByTeacher';
import Register from './containers/RegisterContainer/RegisterContainer';
import Login from './containers/LoginContainer/LoginContainer';
import studentAttendancePage from './pages/StudentAttendancePage/StudentAttendancePage';

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
  return isAllowed ? <Route {...props} /> : <Redirect to={redirectTo} />;
};

function App() {
  const user = useSelector((state) => state.users.user);
  const isAdminRole = user && user.role === 'admin';
  return (
    <div className='App'>
      <CssBaseline />
      <Layout>
        <Switch>
          <ProtectedRoute
            isAllowed={user && isAdminRole}
            redirectTo={'/login'}
            path={['/admin-app/students', '/']}
            exact
            component={StudentsPage}
          />
          <ProtectedRoute
            isAllowed={user && isAdminRole}
            redirectTo={'/login'}
            path='/admin-app/students/:id/edit'
            exact
            component={EditStudentForm}
          />
          <ProtectedRoute
            isAllowed={user && isAdminRole}
            redirectTo={'/login'}
            path='/admin-app/students/add'
            exact
            component={CreateStudentForm}
          />
          <ProtectedRoute
            isAllowed={user && isAdminRole}
            redirectTo={'/login'}
            path='/admin-app/students/:id'
            exact
            component={StudentDetailPage}
          />
          <ProtectedRoute
            isAllowed={user && isAdminRole}
            redirectTo={'/login'}
            path='/admin-app/lessons'
            exact
            component={LessonsPage}
          />
          <ProtectedRoute
            isAllowed={user && isAdminRole}
            redirectTo={'/login'}
            path='/admin-app/groups'
            exact
            component={GroupsPage}
          />
          <ProtectedRoute
            isAllowed={user && isAdminRole}
            redirectTo={'/login'}
            path='/admin-app/payments'
            exact
            component={PaymentsPage}
          />
          <ProtectedRoute
            isAllowed={user && isAdminRole}
            redirectTo={'/login'}
            path='/admin-app/payments/:id'
            exact
            component={PaymentsByStudent}
          />
          <ProtectedRoute
            isAllowed={user}
            redirectTo={'/login'}
            path='/admin-app/teachers'
            exact
            component={TeachersPage}
          />
          <ProtectedRoute
            isAllowed={user}
            redirectTo={'/login'}
            path='/admin-app/lessons/teachers'
            exact
            component={LessonsByTeacher}
          />
          <ProtectedRoute
            isAllowed={user && isAdminRole}
            redirectTo={'/login'}
            path='/admin-app/teachers/:id/edit'
            exact
            component={EditTeacherForm}
          />
          <ProtectedRoute
            isAllowed={user && isAdminRole}
            redirectTo={'/login'}
            path='/admin-app/teachers/add'
            exact
            component={CreateTeacherForm}
          />
          <ProtectedRoute
            isAllowed={user}
            redirectTo={'/login'}
            path='/admin-app/attendance'
            exact
            component={studentAttendancePage}
          />
          <Route isAllowed={user && isAdminRole} redirectTo={'/login'} path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
