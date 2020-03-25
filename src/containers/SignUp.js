import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {userSignUp, isLoading} from "../appRedux/actions/Auth";
import {isMobile} from "react-device-detect";
import { fetchSuccess } from '../appRedux/actions/Common';
import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";

const FormItem = Form.Item;
// 5399830243609649 10/21 00
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverErrors : {}
    };  
    this.onChange = this.onChange.bind(this);    
  }
  onChange(e){
    this.setState({ serverErrors: {}})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ serverErrors: {}})
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({isLoading:true});
        this.props.userSignUp(values).then((res)=>{
          const {registrationError} = this.props;
          if(registrationError.hasOwnProperty('errors')){
            const {errors} = registrationError
            return this.setState({serverErrors : errors, isLoading:false});
          }
                this.setState({isLoading:false});

          return this.props.history.push('/verification')
        });
      }
    });
  };


  componentWillMount() {
    const {authUser, token} = this.props;
    if (authUser && token) {
      this.props.history.push('/dashboard');
    }
  }
  
  componentDidUpdate() {
    if (this.props.token !== null) {
      this.props.history.push('/');
    }
    if(this.state.isLoading){
       this.props.isLoading();
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
              <div className="gx-app-logo">
                {(isMobile) ?
                <img alt="example" src={require("assets/images/whitelogo-sm.png")}/>
                :
                <img alt="example" src={require("assets/images/whitelogo-sm.png")}/>
                }
              </div>
            </div>

            <div className="gx-app-login-content">
                <h1><IntlMessages id="app.userAuth.signUp"/></h1>
                <p><IntlMessages id="app.userAuth.bySigning"/></p>
              <Form onSubmit={this.handleSubmit} className="gx-signup-form gx-form-row0">
                <FormItem>
                  {getFieldDecorator('name', {
                    rules: [{required: true, message: 'Please input your username!'}],
                  })(
                    <Input placeholder="Name" onChange={this.onChange}/>
                  )}
                  {(serverErrors.name)? 
                  <div class="ant-form-item-control has-error">
                    <div class="ant-form-explain">{serverErrors.name}</div>
                  </div>: ''}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{
                      required: true, type: 'email', message: 'The input is not valid E-mail!',
                    }],
                  })(
                    <Input placeholder="Email" onChange={this.onChange}/>
                  )}
                  {(serverErrors.email)? 
                  <div class="ant-form-item-control has-error">
                    <div class="ant-form-explain">{serverErrors.email}</div>
                  </div>: ''}
                </FormItem>
                

                <FormItem>
                  {getFieldDecorator('phone', {
                    rules: [{
                      required: true, message: 'Please enter your Phone Number',
                    }],
                  })(
                    <Input type="telephone" placeholder="Your Phone Number" onChange={this.onChange}/>
                  )}
                  {(serverErrors.phone_number)? 
                  <div class="ant-form-item-control has-error">
                    <div class="ant-form-explain">{serverErrors.phone_number}</div>
                  </div>: ''}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{required: true, message: 'Please input your Password!'}, {min:6, message:'Password must be more than 6 character'}],
                  })(
                    <Input type="password" placeholder="Password" onChange={this.onChange} />
                  )}
                  {(serverErrors.password)? 
                  <div class="ant-form-item-control has-error">
                    <div class="ant-form-explain">{serverErrors.password}</div>
                  </div>: ''}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('confirmPassword', {
                    rules: [{required: true, message: 'Please input your Password Again!'}, { matches:'password', message:'Password does not match'}],
                  })(
                    <Input type="password" placeholder="Confirm Password" onChange={this.onChange}/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('accepted', {
                    valuePropName: 'checked',
                    initialValue: true,
                    rules:[{ required: true, message: 'Please Accept our Terms and Condition.'}]
                  })(
                    <Checkbox required={true}><IntlMessages id="appModule.iAccept"/></Checkbox>
                  )}
                  <span className="gx-link gx-signup-form-forgot"><IntlMessages
                    id="appModule.termAndCondition"/></span>
                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signUp"/>
                  </Button>
                  <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signin"><IntlMessages
                  id="app.userAuth.signIn"/></Link>
                </FormItem>
              </Form>
            </div>
            <InfoView/>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedSignUpForm = Form.create()(SignUp);

const mapStateToProps = ({ auth }) => {
  const {authUser, registrationError, token} = auth;
  return { authUser,registrationError, token }
};

export default connect(mapStateToProps, {userSignUp, isLoading, fetchSuccess})(WrappedSignUpForm);
