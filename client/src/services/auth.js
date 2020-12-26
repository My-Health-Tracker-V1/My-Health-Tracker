import axios from 'axios';

const signup = (email, password) => {
  return axios
    .post('/api/auth/signup', { email, password })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data;
    });
}

const login = (email, password) => {
  console.log(email, password)
  return axios
    .post('/api/auth/login', { email, password })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      return err.response.data;
    });
}

const logout = () => {
  return axios
  .delete('/api/auth/logout')
  .then(response => {
    return response.data
  })
  .catch(err => {
    return err.response.data;
  });
}

export { signup, login, logout }; 