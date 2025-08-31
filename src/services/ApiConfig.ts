import axios from 'axios';

export default () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
      Accept: 'Application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'Application/json; charset=UTF-8',
      //'Access-Control-Allow-Origin': '*'
    }
  });
};
