import axios from "axios";
import {store} from "../store";
import { baseURL } from '../config'
export const Axios = axios.create({
  baseURL, //测试服务器
  // timeout: 5000,
  headers: { "Content-Type": "application/json" },
});
Axios.interceptors.request.use((config) => {
    config.headers['token'] = store.getState().token;
    config.headers['lang'] = (localStorage.getItem('lang') === 'kr' ? 'hy':localStorage.getItem('lang')) || 'en'
    return config;
});
Axios.interceptors.response.use(
  (res) => {
    console.log(res.data.code === 401)
    if(res.data.code === 401){
      store.dispatch({
        type: 'SETTOKEN',
        token:'',
        address: ''
      })
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default Axios;
