import axios from 'axios';
import config from './config';
import store from './store/configureStore';

const instance = axios.create({
  baseURL: config.BACKEND_BASE_URL || 'http://localhost:8080',
});

instance.interceptors.request.use((req) => {
  const users = store.getState().users;
  if (users.user) req.headers['Authorization'] = `Bearer ${users.user.token}`;
  return req;
});

export default instance;
