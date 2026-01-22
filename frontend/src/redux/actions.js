import axios from 'axios';
import * as types from './actionTypes';

const API_URL = 'http://localhost:8000/api';

// Auth Actions
export const login = (username, password) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });

  return axios
    .post(`${API_URL}/token/`, { username, password })
    .then((response) => {
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { access, refresh },
      });
      return response.data;
    })
    .catch((error) => {
      dispatch({
        type: types.LOGIN_FAILURE,
        payload: error.response?.data || 'Login failed',
      });
      throw error;
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  dispatch({ type: types.LOGOUT });
};

export const refreshToken = () => (dispatch, getState) => {
  dispatch({ type: types.REFRESH_TOKEN_REQUEST });

  const refresh = localStorage.getItem('refresh_token');

  return axios
    .post(`${API_URL}/token/refresh/`, { refresh })
    .then((response) => {
      const { access } = response.data;
      localStorage.setItem('access_token', access);

      dispatch({
        type: types.REFRESH_TOKEN_SUCCESS,
        payload: access,
      });
      return access;
    })
    .catch((error) => {
      dispatch({
        type: types.REFRESH_TOKEN_FAILURE,
        payload: error.response?.data || 'Token refresh failed',
      });
      dispatch(logout());
      throw error;
    });
};

// Data Actions
export const fetchHelloWorld = () => (dispatch) => {
  dispatch({ type: types.FETCH_DATA_REQUEST });

  const token = localStorage.getItem('access_token');

  return axios
    .get(`${API_URL}/hello/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch({
        type: types.FETCH_DATA_SUCCESS,
        payload: response.data,
      });
      return response.data;
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_DATA_FAILURE,
        payload: error.response?.data || 'Failed to fetch data',
      });
      throw error;
    });
};
