import React from "react";
import IntlMessages from "util/IntlMessages";

class Verification extends React.Component {

  render() {
    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content" style={{ background : 'rgba(255, 81, 0, 0.88)'}}>
            <div className="gx-app-logo-content" style={{ width:'92%', height: 350}}>
              <div className="gx-app-logo-content-bg">
                <img src='https://via.placeholder.com/272x395' alt='Neature'/>
              </div>
              <div className="gx-app-logo-wid" style={{ textAlign:'center'}}>
                <h1 className="icons icon-mail-open" style={{ display: 'block', margin: 'auto 50%',fontSize: '87px', }}> </h1>
                <h1><IntlMessages id="app.userAuth.signUpComplete"/></h1>
                <p><IntlMessages id="app.userAuth.verifyEmail"/></p>
                <p><IntlMessages id="app.userAuth.resendEmail"/></p>
                <div>
                  <button className="btn" style={{ background:'#fff', border:'none', color:'#ff5100'}} to=""> 
                    Resend Email
                  </button>
                </div>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require("assets/images/logo.png")}/>
              </div>
            </div>

            {/* <div className="gx-app-login-content">
              
            </div> */}
            {/* <InfoView/> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Verification;
