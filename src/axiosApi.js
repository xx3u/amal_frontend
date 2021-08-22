import axios from 'axios';
<<<<<<< HEAD
import config from './config';
=======
import store from './store/configureStore';
>>>>>>> 96f33b3da53f305ba92f3c0ac539c6153329759f

const instance = axios.create({
  baseURL: config.BACKEND_BASE_URL || 'http://localhost:8080',
});

instance.interceptors.request.use((req) => {
  const users = store.getState().users;
  if (users.user) req.headers['Authorization'] = `Bearer ${users.user.token}`;
  return req;
});

export default instance;
