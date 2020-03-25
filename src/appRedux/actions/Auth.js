import {
  INIT_URL,
  USER_DATA,
  AUTH_STEP, 
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SET_USER_TOKEN,
  OTP_VERIFICATION,
  SIGNUP_USER_ERROR,
  SIGNOUT_USER_SUCCESS,
} from "../../constants/ActionTypes";
import axios from 'util/Api'
import query from 'axios'
import { setOtpUser, setAuthUser, getUserDetails, setUserData, unsetOtp } from 'util/functions/user';

const authUrl = 'http://127.0.0.1:8000/api/';

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const isLoading = ()=>{
  return (dispatch) =>{
    return dispatch({type: FETCH_START})
  }
}
/**
 * Sends post request to validate the Otp supplied by user
 * @param object data
 */
export const validateOtp = (data, unsetUser = true)=>{
  const {values} = data
  return (dispatch) =>{
    dispatch({type: FETCH_START});
    return axios.post('otp/validation', {
      token:values.token, email:JSON.parse(getUserDetails()).email
    }).then(({data})=>{
        if(unsetUser === true) {setAuthUser(data)}
        dispatch({type: FETCH_SUCCESS, payload:'Verification completed. Please continue with the operation'});
        if(unsetUser === true) {return dispatch({type: SET_USER_TOKEN, payload: data.token});}
        if(unsetUser === false) {unsetOtp(); return dispatch({type: OTP_VERIFICATION, payload: true});}
    }).catch(function (error){
        const {request, response} = error
        if(typeof request !== 'undefined' && typeof error !== 'undefined'){
          return dispatch({type:FETCH_ERROR, payload:response.data.message})
        }
        return dispatch({type: SIGNUP_USER_ERROR, payload: error.response.data});
    })
  }
}

export const userSignUp = ({email, phone, password, name, confirmPassword}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    return query.post(authUrl + 'auth/register', {
        email,password,name, 
        phone_number:phone,
        password_confirmation:confirmPassword
      }
    ).then(({data}) => {
      if (data.valueOf() !== '') {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({type: FETCH_SUCCESS, payload:"Registration was successful, Please Verify Your Email."});
        return dispatch({type: USER_DATA, payload: data});
      } else {
        return dispatch({type: FETCH_ERROR, payload: "Network Error, Please after two minutes "});
      }
    }).catch(function (error) {
      const {request, response} = error
      if(request.status === 422){
        return dispatch({type:SIGNUP_USER_ERROR, payload:response.data})
      }
      return dispatch({type: FETCH_ERROR, payload: error.message});
    });
  }
};

export const userSignIn = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    return query.post(authUrl+'auth/login', { email, password }
    ).then(({data}) => {
      if (data.user) {
        setOtpUser(data);
        dispatch({type: AUTH_STEP, payload: data.auth_step});
        return dispatch({type: FETCH_SUCCESS, payload:'Login Successfully, Please provide the OTP sent to you.'});
      } else {
        return dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      const {request, response} = error
      if(typeof request !== 'undefined' && request.status === 405){
        return dispatch({type:FETCH_ERROR, payload:response.data.message})
      }
      if(typeof request !== 'undefined' && request.status === 403){
        return dispatch({type:FETCH_ERROR, payload:response.data.message})
      }
      if(error.toString() === 'Error: Network Error'){
        return dispatch({type: FETCH_ERROR, payload: error.toString() + '; Oops You are offline'});
      }
      return dispatch({type: SIGNUP_USER_ERROR, payload: error.response.data});
    });
  }
};

export const getUser = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/user',
    ).then(({data}) => {
      if (data) {
        setUserData(data);
        dispatch({type: FETCH_SUCCESS});
        return dispatch({type: USER_DATA, payload: data.user});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    });
  }
};

export const userSignOut =  () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
      setTimeout(() => {
         localStorage.clear();
         dispatch({type: FETCH_SUCCESS});
         dispatch({type: SIGNOUT_USER_SUCCESS});
      }, 100);
  }
};
