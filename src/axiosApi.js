import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

instance.interceptors.request.use((req) => {
  const users = store.getState().users;
  if (users.user) req.headers['Authorization'] = `Bearer ${users.user.token}`;
  return req;
});

export default instance;
