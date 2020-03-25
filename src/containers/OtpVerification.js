import React, { Component } from 'react'
import {Avatar, Button, Form, Input} from "antd";
import {connect} from "react-redux";
import IntlMessages from "util/IntlMessages";
import {getUserDetails, getOtp, isAuth} from 'util/functions/user';
import {validateOtp} from 'appRedux/actions/Auth';
import InfoView from "components/InfoView";

const FormItem = Form.Item;

class OtpVerification extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.validateOtp({values});
      }
    });
  };
  
  componentDidUpdate() {
    this.LoadPage();
  }
  
  componentWillMount(){
    this.LoadPage();
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
      <React.Fragment>
      <div className="gx-login-container">
        <div className="gx-login-content gx-text-center">
          <div className="gx-login-header">
            <Avatar shape="circle" className="gx-size-120" src=''/>
          </div>
          <div className="gx-mb-4">
            <h3>{name}</h3>
            <p><IntlMessages id="appModule.enterPasswordUnlock"/></p>
            <code>{phone_number}</code>
          </div>
           
          <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
            <FormItem>
              {getFieldDecorator('token', {
                rules: [{required: true, message: 'Please input your OTP!'}],
              })(
                <Input type="number" placeholder="Please enter your OTP code"/>
              )}
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit">
                <IntlMessages id="app.userAuth.unLock"></IntlMessages>
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <InfoView/>                                                               
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state)=>{
    return {}
}
export default connect(mapStateToProps, {validateOtp})(Form.create()(OtpVerification));
