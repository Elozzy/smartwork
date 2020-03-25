import React from "react";
import IntlMessages from "util/IntlMessages";
import {userSignOut} from "../appRedux/actions/Auth";
import configureStore from "../appRedux/store";
export const SiteStore = configureStore();

class Unverified extends React.Component {  
  componentWillMount(){
    SiteStore.dispatch(userSignOut())
  }
  handleClick(){
    
  }
  render() {
    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content" style={{ background : 'rgba(255, 81, 0, 0.88)'}}>
            <div className="gx-app-logo-content" style={{ width:'92%', height: 350}}>
              <div className="gx-app-logo-content-bg">
                
              </div>
              <div className="gx-app-logo-wid" style={{ textAlign:'center'}}>
                <h1 className="icons icon-mail-open" style={{ display: 'block', margin: 'auto',fontSize: '87px', }}> </h1>
                <h1><IntlMessages id="app.userAuth.unverifiedEmail"/></h1>
                <p><IntlMessages id="app.userAuth.verifyEmail"/></p>
                <p><IntlMessages id="app.userAuth.resendEmail"/></p>
                <div>
                  <button className="btn" style={{ background:'#fff', border:'none', color:'#ff5100'}} onClick={this.handleClick}> 
                    Resend Email
                  </button>
                </div>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require("assets/images/logo.png")}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Unverified;
