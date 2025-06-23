import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://blog-app-iqo4.onrender.com',
});

export default instance;
