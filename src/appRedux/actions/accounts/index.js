import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SAVE_BANK_DATA} from "../../../constants/ActionTypes";
import axios from 'util/Api'

export const saveBankInfo = ({bank_name, account_name, account_number})=>{
    return (dispatch) => {
        dispatch({type : FETCH_START})
        return axios.post('user/add-bank', {
            bank_name, account_name, account_number
        }).then(({data}) => {
            dispatch({ type: FETCH_SUCCESS, payload:data.message })
        }).catch((err) => {
            dispatch({ type:FETCH_ERROR, payload:err.message})
        });
    }
}
export const getBankInfo = ()=>{
    return (dispatch) => {
        return axios.post('user/account')
        .then(({data}) => {
            return dispatch({type : SAVE_BANK_DATA, payload: data.bank })
        }).catch((err) => {
            
        })
    }
}