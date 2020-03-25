import {SAVE_BANK_DATA } from "../../../constants/ActionTypes";

const INIT_STATE = {
  bankAccount : null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case SAVE_BANK_DATA:{
      return {...state, bankAccount : action.payload}
    }
    
    default:
      return state;
  }
}
