import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {isMobile} from "react-device-detect";

import {getOtp, isAuth} from 'util/functions/user';
import {userSignIn, isLoading} from "../appRedux/actions/Auth";
import { fetchSuccess, fetchStart } from '../appRedux/actions/Common';
import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";
const FormItem = Form.Item;
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      serverErrors : {},
    };  
    this.onChange = this.onChange.bind(this);    
  }
  onChange(e){
    this.setState({ serverErrors: {}})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({isLoading:true});
        this.props.userSignIn(values).then(
          (res)=>{
            const {registrationError} = this.props;
            if(registrationError.hasOwnProperty('errors')){
              const {errors} = registrationError
              return this.setState({serverErrors : errors, isLoading:false});
            }
            return this.setState({isLoading:false})
          }
        );
      }
    });
  };
  
  componentWillMount() {
    this.LoadForm();
    const {authUser, token} = this.props;
    if (authUser && token) {
      this.props.history.push('/dashboard');
    }
  }

  LoadForm(){
    if (isAuth() && !getOtp()) {
      return this.props.history.push('/dashboard');
    }else if(getOtp() && !isAuth()){
      return this.props.history.push(`/otp-verify/${getOtp()}`);
    }
  }
  
  componentDidUpdate() {
    this.LoadForm();
    if(this.state.isLoading){
       this.props.isLoading();
       this.props.fetchStart();
    }else{
       this.props.fetchSuccess();
    }
  }
  
  render() {
    const {getFieldDecorator} = this.props.form, {serverErrors} = this.state;
    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
              </div>
              <div className="gx-app-logo-wid">
                  <img className="auth-illus" src={require("assets/images/illustration-2.png")} alt='Neature'/>
              </div>                        
              
            </div>
            <div className="gx-app-login-content">
            <div className="gx-app-logo">
              <img alt="example" src={require("assets/images/whitelogo-sm.png")}/>
              </div>
                <h1><IntlMessages id="app.userAuth.signIn"/></h1>
                <h1>Welcome Back</h1>
                <p><IntlMessages id="app.userAuth.bySignIn"/></p>
              <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{
                      required: true, type: 'email', message: 'The input is not valid E-mail!',
                    }],
                  })(
                    <Input type="email" placeholder="Email"/>
                  )}
                  {(serverErrors.email)? 
                  <div class="ant-form-item-control has-error">
                    <div class="ant-form-explain">{serverErrors.email}</div>
                  </div>: ''}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{required: true, message: 'Please input your Password!'},{min:6, message:'Password must be more than 6 character'}],
                  })(
                    <Input type="password" placeholder="Password"/>
                  )}
                  {(serverErrors.password)? 
                  <div class="ant-form-item-control has-error">
                    <div class="ant-form-explain">{serverErrors.password}</div>
                  </div>: ''}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox><IntlMessages id="appModule.remember"/></Checkbox>
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signIn"/>
                  </Button>
                  <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages
                  id="app.userAuth.signUp"/></Link>
                </FormItem>
                <span className="gx-text-light gx-fs-sm"> </span>
              </Form>
            </div>
            <InfoView/>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({auth}) => {
  const {token, registrationError, auth_step} = auth;
  return {token, registrationError, auth_step}
};

export default connect(mapStateToProps, {userSignIn, fetchStart,  isLoading, fetchSuccess})(WrappedNormalLoginForm);
