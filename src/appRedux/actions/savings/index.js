import axios from 'util/Api';
import {
  FETCH_START,
  SAVING_DATA,
  FETCH_ERROR, 
  REDIRECT_URL,
  FETCH_SUCCESS,
  USER_SAVINGS_DATA,
} 
from "constants/ActionTypes";
import { storeTempDeposit as temp } from 'util/functions/user';
const trnxPrefix = '/auth/user/transactions/';
const prefix = '/auth/user/';

export const accountType = ()=>{
  axios.post(`${prefix}/account_type/`)
}

export const userTypeSavings = ({type}) => {
	return (dispatch) => {
    axios.post(`${prefix}savings/${type}`,
    ).then(({data}) => {
      if (data.result) {
        dispatch({type: SAVING_DATA, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    });
  }
}

export const getUsersSavings = () =>{
  return (dispatch) => {
    axios.post(`${prefix}user/savings/`,
    ).then(({data}) => {
      console.log(data)
      if (data) {
        dispatch({type: USER_SAVINGS_DATA, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    });
  }
}

export const deposit = (formData)=>{
  return (dispatch)  =>{
    dispatch({type: FETCH_START});
    axios.post(`${trnxPrefix}deposit`,formData).then(({data})=>{
      return dispatch({type:FETCH_SUCCESS, payload:data.message})
    }).catch((err)=>{
        dispatch({type: FETCH_ERROR, payload: err.message})
    })
  }
}
// $new  = str_replace("%HOSTNAME%",$data['db_host'],$database_file);
// $new  = str_replace("%USERNAME%",$data['db_user'],$new);
// $new  = str_replace("%PASSWORD%",$data['db_password'],$new);
// $new  = str_replace("%DATABASE%",$data['db_name'],$new);

export const storeTempDeposit = (formData)=>{
  return (dispatch)=> {
    dispatch({type: FETCH_START});
    temp(formData);
    return axios.post(`${trnxPrefix}send-otp`).then(({data})=>{
      dispatch({type:REDIRECT_URL, payload:formData.redirect})
      return dispatch({type:FETCH_SUCCESS, payload:'Confirm The OTP'})
    }).catch((err) =>{
      return dispatch({type:FETCH_ERROR, payload:err.message})
    })
  }
}