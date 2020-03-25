import React, { Component } from 'react'
import {Avatar, Button, Form, InputNumber} from "antd";
import {connect} from "react-redux";
import IntlMessages from "util/IntlMessages";
import {getUserDetails, getOtp, isAuth} from 'util/functions/user';
import {validateOtp} from 'appRedux/actions/Auth';
import InfoView from "components/InfoView";

const FormItem = Form.Item;

class TwoFAVerification extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.validateOtp({values}, false).then((res)=>{
              const {OtpVerification, redirectUrl} = this.props  
              if(OtpVerification){
                return this.props.history.push(redirectUrl)
            }
        });
      }
    });
  };
  
  componentDidUpdate() {
    // this.LoadPage();
  }
  
  componentWillMount(){
    // this.LoadPage();
  }

  LoadPage(){
    if(!getOtp() && !isAuth()){
      return this.props.history.push('/signin');      
    }else if(isAuth()){
      return this.props.history.push('/dashboard');      
    }
  }
  
  render() {
    const {name, phone_number} = (getUserDetails() !== 'undefined' && getUserDetails() !== null) ? JSON.parse(getUserDetails()) : '...' 
    const {getFieldDecorator} = this.props.form;
    return (
        <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
      <InfoView/>
      <div className="gx-login-container">
        <div className="gx-login-content gx-text-center">
          <div className="gx-login-header">
            <Avatar shape="circle" className="gx-size-120" src={require('../assets/images/robot.png')}/>
          </div>
          <div className="gx-mb-4">
            <h3>{name}</h3>
            <p><IntlMessages id="appModule.enter2FA2Unlock"/></p>
            <code>{phone_number}</code>
          </div>
           
          <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
            <FormItem>
              {getFieldDecorator('token', {
                rules: [{required: true, message: 'Please input your OTP!'}],
              })(
                <InputNumber  size="large" style={{ width: "100%"}} placeholder="Please enter your OTP code"/>
              )}
            </FormItem>

            <FormItem>
              <Button size="large" type="primary" htmlType="submit">
                <IntlMessages id="app.userAuth.unLock"></IntlMessages>
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>                                                               
      </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
    const {redirectUrl} = state.Savings;
    const {OtpVerification} = state.auth;
    return {OtpVerification, redirectUrl};
}
export default connect(mapStateToProps, {validateOtp})(Form.create()(TwoFAVerification));
