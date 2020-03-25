import {USER_SAVINGS_DATA, SAVING_DATA, REDIRECT_URL } from "../../../constants/ActionTypes";

const INIT_STATE = {
  savingsData : {},
  userSavings : {},
  redirectUrl: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case USER_SAVINGS_DATA:{
      return {...state, userSavings : action.payload}
    }
    case SAVING_DATA:{
      return {...state, savingsData : action.payload}
    }
    case REDIRECT_URL:{
      return {...state, redirectUrl : action.payload}
    }
    default:
      return state;
  }
}
