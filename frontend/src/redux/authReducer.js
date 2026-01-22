import * as types from './actionTypes';

const initialState = {
  access_token: localStorage.getItem('access_token') || null,
  refresh_token: localStorage.getItem('refresh_token') || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        access_token: action.payload.access,
        refresh_token: action.payload.refresh,
        loading: false,
        isAuthenticated: true,
        error: null,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case types.LOGOUT:
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        isAuthenticated: false,
        error: null,
      };
    case types.REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        access_token: action.payload,
        loading: false,
      };
    case types.REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
