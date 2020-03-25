import {INIT_URL, SIGNOUT_USER_SUCCESS, USER_DATA, SIGNUP_USER_ERROR, SET_USER_TOKEN, OTP_VERIFICATION, AUTH_STEP} from "../../constants/ActionTypes";

const INIT_STATE = {
  initURL: '',
  auth_step : '',
  registrationError : {},
  token: JSON.parse(localStorage.getItem('token')),
  authUser: (localStorage.getItem('user') !== 'undefined') ? JSON.parse(localStorage.getItem('user')) : {},
  OtpVerification:false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {


    case INIT_URL: {
      return {...state,registrationError:{}, initURL: action.payload};
    }
    case SIGNUP_USER_ERROR:{
      return {...state, registrationError:action.payload}
    }
    case AUTH_STEP:{
      return {...state, token:null, authUser:null, registrationError:{}, auth_step:action.payload}
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: '',
        registrationError:{}
      }
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
        registrationError:{}
      };
    }

    case SET_USER_TOKEN: {
      return {
        ...state,
        registrationError:{},
        token: action.payload,
      };
    }
    case OTP_VERIFICATION: {
      return {...state, OtpVerification:action.payload}
    }
    default:
      return state;
  }
}
