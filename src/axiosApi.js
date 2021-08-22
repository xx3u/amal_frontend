import axios from 'axios';
import { logoutUser } from './store/actions/usersActions';
import store from './store/configureStore';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

instance.interceptors.request.use((req) => {
  const users = store.getState().users;
  if (users.user) req.headers['Authorization'] = `Bearer ${users.user.token}`;
  return req;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.data === 'Unauthorized') {
      store.dispatch(logoutUser());
    }
    return Promise.reject(error);
  }
);

export default instance;
