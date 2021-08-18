import axios from 'axios';
import config from './config';

const instance = axios.create({
  baseURL: config.BACKEND_BASE_URL || 'http://localhost:8080',
});

export default instance;
