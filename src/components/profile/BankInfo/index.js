import React from 'react';
import { connect } from 'react-redux'
import {Button, Card, Form, Input, Select, InputNumber} from "antd";
import SocialMedia from "components/Widgets/SocialMedia";
import { saveBankInfo, getBankInfo } from 'appRedux/actions/accounts/index';

const FormItem = Form.Item;
const Option = Select.Option;

class BankInfo extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.saveBankInfo(values)
          }
        });
    }
    
    componentDidMount() {
        this.props.getBankInfo();
    }
    
    render(){
    const {getFieldDecorator} = this.props.form;
    const { bankAccount } = this.props;
    if(bankAccount !== null){
        return (
            <SocialMedia 
                title="Bank Information" 
                header={bankAccount.account_name} 
                greetings={bankAccount.bank_name}
                salute={bankAccount.account_number}  
            />
        ); 
    }
    return (
        <Card className="gx-card " title="Bank Account Details">
            <Form onSubmit={this.handleSubmit}>        
                <FormItem
                    label="Bank Name"
                    labelCol={{xs:24, sm:6}}
                    wrapperCol={{xs: 24, sm: 24}}
                >
                {getFieldDecorator('bank_name', {
                    rules: [{required: true, message: 'Please select your Bank Name!'}],
                })(
                    <Select
                    placeholder="Select a option and change input text above"
                    onChange={this.handleSelectChange}
                    >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    </Select>
                )}
                </FormItem>
                <FormItem
                    label="Account Number"
                    labelCol={{xs: 24, sm:6}}
                    wrapperCol={{xs: 24, sm: 24}}
                >
                {getFieldDecorator('account_number', {
                    rules: [{required: true, message: 'Please enter your Bank Account Number!'}],
                })(
                    <InputNumber
                        style={{ width:'100%'}}
                        placeholder="Enter Your Account Number" 
                    />
                )}
                </FormItem>
                <FormItem
                    label="Account Name"
                    labelCol={{xs: 24, sm: 6}}
                    wrapperCol={{xs: 24, sm: 24}}
                >
                {getFieldDecorator('account_name', {
                    rules: [{required: true, message: 'Please Enter Your Bank Account Name'}],
                })(
                    <Input/>
                )}
                </FormItem>
                <FormItem
                    wrapperCol={{xs: 24, sm: {span: 12, offset: 5}}}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        </Card>
    );
   }
}
const mapStateToProps = ({Account})=>{ 
    const {bankAccount} = Account;
    return {bankAccount}
}
export default connect(mapStateToProps, {getBankInfo,saveBankInfo})(Form.create()(BankInfo));
