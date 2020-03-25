import query from 'axios';
import {userSignOut} from '../appRedux/actions/Auth'
import configureStore from "../appRedux/store";
import { networkInterfaces } from 'os';
let inFaces = networkInterfaces();
let ipAddress = Object.keys(inFaces).forEach((ifName)=> {
  let alias = 0;
  inFaces[ifName].forEach((iFace)=>{
    if('IPv4' !== iFace.family || iFace.internal !== false){
      console.log('Hello' + iFace)
      return;
    }
    if (alias >=1 ){
      console.log( 'Hel lod' + iFace)
        return  iFace.address
    }else{
      console.info( 'Hello d' + ifName, iFace)
    }
    ++alias;
  })
})
console.log(ipAddress, inFaces, networkInterfaces())
export const SiteStore = configureStore();
  const axios = query.create({
    baseURL: `http://127.0.0.1:8000/api/`,
    headers: {
      'cache-control': 'no-cache',
      'Accept': 'application/json'
    }
  });  

  axios.interceptors.request.use(
    config => {
      config.headers.authorization = 'Bearer '+ JSON.parse(localStorage.getItem('token'));
      return config;
    },
    error => Promise.reject(error)
  );
  
  axios.interceptors.response.use(
    response => response,
    (error) => {
      if(error.response.status === 401 ) {
        SiteStore.dispatch(userSignOut())
      }
      if(error.response.status === 403){
        SiteStore.dispatch(userSignOut())
        const ObjState = {Page: 'Unverified Email Account', Url : '/unverified',}
        return window.history.pushState(ObjState, ObjState.Page,   ObjState.Url)
      }
      return Promise.reject(error);
    }
    );

export default axios;