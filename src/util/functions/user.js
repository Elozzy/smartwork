
export const getUserDetails =  ()=>{
    return (localStorage.getItem('user')) ? localStorage.getItem('user') : localStorage.getItem('temp_user');
}

export const setOtpUser = (data)=>{
    localStorage.setItem("auth_step", JSON.stringify(data.auth_step));
    localStorage.setItem("auth_id", JSON.stringify(data.user_id));
    localStorage.setItem("temp_user", JSON.stringify(data.user));
}

export const setUserData = (data)=>{
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("balanceHistory", JSON.stringify(data.balanceHistory));
    localStorage.setItem("wallet", JSON.stringify(data.smartWallet));
    localStorage.setItem("referralLink", JSON.stringify(data.referral_link));
    localStorage.setItem("transferHistory", JSON.stringify(data.transferHistory));
}

export const balanceHistory = ()=>{
    return (localStorage.getItem('balanceHistory')) ? JSON.parse(localStorage.getItem('balanceHistory')) : '';
}
export const TransferHistory =()=> {
    return JSON.parse(localStorage.getItem('transferHistory'))
}
export const setAuthUser = (data)=>{
    localStorage.clear();
    // localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
}

export const isAuth = ()=>{
    return (localStorage.getItem('token') === null && localStorage.getItem('user') === null) ? false : true;
}

export const getOtp = ()=>{
    return (localStorage.getItem('auth_step') === null) ? false : JSON.parse(localStorage.getItem('auth_step'));
}

export const getWallet = ()=>{
    if (isAuth()){
        return (localStorage.getItem('wallet') === null ) ? [] : JSON.parse(localStorage.getItem('wallet'));
    }
}
export const storeTempDeposit = (formData)=>{
    localStorage.setItem("deposit", JSON.stringify(formData))
    localStorage.setItem("auth_step", JSON.stringify('transaction OTP'));
    return true;
}

export const unsetOtp = ()=>{
    localStorage.removeItem('auth_step');
}

export const getTempDeposit = ()=> {
    return (localStorage.getItem('deposit') === null) ? false : JSON.parse(localStorage.getItem('deposit'));
}