import React from 'react';
import {connect} from "react-redux";
import {userTypeSavings, storeTempDeposit, deposit} from "appRedux/actions/savings";
import {Button, Card, Form, Input, Select, InputNumber, Radio, Tabs} from "antd";
import AppHeader from "components/AppHeader/header";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class SavingsPage extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
		  mode: 'top',
		  size: 'small',
		  savingsType:'...',
		  payment_mode : 'bank_transfer',
		  account_type : ''
	  };
	}

	handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
			const {payment_mode, account_type} = this.state;
          if (!err) {
			const formData =  Object.assign(
				{payment_mode, account_type, redirect:'/checkout/savings'}, 
				values
			);		
			this.props.storeTempDeposit(formData).then((res)=>{
				this.props.history.push('/otp-verification')
			})
          }
        });
    }

	async componentDidMount() {
		let {params} = this.props.match;
		await this.setState({ savingsType : params.type, account_type: params.type });
		return this.props.userTypeSavings({type : this.state.savingsType});
	}

	onChange = (payment_mode) => {
		this.setState({payment_mode});
	};		
	
	/*
	 * @return Object
	 *
	*/
	render() {
		const {getFieldDecorator} = this.props.form;
		let {savingsType, mode, size} = this.state;
		// Render the same form and Table only the data should change
		return (			
			<div>
                <AppHeader name={savingsType + " Savings Account"} total={"NGN" + 234} aboutTotal ={"Current Balance"}/>
				<div className="gx-profile-content">
				{/* <SavingForm /> */}
					<Card className="gx-card" title= "Make a Deposit using the Various Method">
						<Tabs
						defaultActiveKey="bank_transfer"
						tabPosition={mode}
						style={{height: '100%'}}
						size={size}
						onChange={this.onChange}
						>
							<TabPane tab="Bank Transfer" key="bank_transfer">
							<Card className="gx-card " title="">
								<Form onSubmit={this.handleSubmit}>        
									<FormItem
										label="Amount "
										labelCol={{md: 24, sm:6}}
										wrapperCol={{xs: 24, sm: 24}}
										labelAlign='left'
									>
									{getFieldDecorator('deposit', {
										rules: [{required: true, message: 'Specify your amount to deposit!'}],
									})(
										<InputNumber style={{ width: "100%"}}  placeholder="Amount to Save" />
									)}
									</FormItem>
									<FormItem
										label="Purpose"
										labelCol={{sm:6}}
										wrapperCol={{xs: 24, sm: 24}}
										labelAlign='left'
									>
									{getFieldDecorator('purpose', {
										rules: [{required: true, message: 'What is the reason you are saving.'}],
									})(
										<Input
											placeholder="Saving for Food Stuff" 
										/>
									)}
									</FormItem>
									{/* <FormItem
										label="Savings Target "
										labelCol={{sm: 6}}
										wrapperCol={{xs: 24, sm: 24}}
										labelAlign='left'
									>
									{getFieldDecorator('target', {
									})(
										<InputNumber style={{ width: "100%"}} placeholder="Saving Towards 10,000" defaultValue='112' />
									)}
									</FormItem> */}
									<FormItem
										wrapperCol={{xs: 24, sm: {span: 12, offset: 5}}}
									>
										<Button type="primary" htmlType="submit">
											Submit
										</Button>
									</FormItem>
								</Form>
							</Card>
							</TabPane>
							<TabPane tab="Card Deposit" key="card"></TabPane>
							<TabPane tab="Recharge Card" key="airtime">Content of tab 3</TabPane>
							<TabPane tab="QR Code" key="qt_pay">Content of tab 4</TabPane>
							<TabPane tab="By A Friend" key="transfer">Content of tab 5</TabPane>
						</Tabs>
					</Card>
				</div>
			</div>
		);
	}
}
const mapStateToProps = ({state})=>{
  return {state}	
}
export default connect(mapStateToProps, {userTypeSavings, storeTempDeposit, deposit})(Form.create()(SavingsPage));