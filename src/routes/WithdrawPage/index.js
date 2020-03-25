import React from 'react'
import {Card,  Tabs, Form} from "antd";
import AppHeader from "components/AppHeader/header";
import { connect } from 'react-redux';
import  WithdrawalForm  from './Form';

const TabPane = Tabs.TabPane;

class WithdrawPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'top',
            size: 'small',
            'account_type' : 'general',
        };
    }
    onChange= (account_type) => {
        this.setState({account_type});
    };
    
    handleSubmit=(e)=>{
        e.preventDefault();
        let {account_type} = this.state
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values = Object.assign({ account_type }, values);
                console.log(values)
            }
            console.log(values)
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {mode,size} = this.state;
        const generalIcon = <i className={`icon icon-orders gx-fs-xlxl gx-text-primary gx-d-flex`} style={{fontSize: 45}}/> ;
        const targetIcon = <i className={`icon icon-revenue-new gx-fs-xlxl gx-text-primary gx-d-flex`} style={{fontSize: 45}}/>;
        const fixedIcon = <i className={`icon icon-visits gx-fs-xlxl gx-text-primary gx-d-flex`} style={{fontSize: 45}}/>;
        return (
            <div>
                <AppHeader name={"Net Balance"} total={"NGN" + 234} aboutTotal ={"All Accounts Balance"}/>
				<div className="gx-profile-content">
					<Card className="gx-card" title= "Withdraw ">
						<Tabs
                            defaultActiveKey="general"
                            tabPosition={mode}
                            style={{height: '100%'}}
                            size={size} 
                            onChange={this.onChange}
						>
							<TabPane tab={generalIcon} key="general">
                                <WithdrawalForm handleSubmit={this.handleSubmit} getFieldDecorator={getFieldDecorator} type='General Savings'/>
							</TabPane>
							<TabPane tab={targetIcon} key="target">
                                <WithdrawalForm handleSubmit={this.handleSubmit} getFieldDecorator={getFieldDecorator} type='Target Savings'/>
                            </TabPane>
							<TabPane tab={fixedIcon} key="fixed">
                                <WithdrawalForm handleSubmit={this.handleSubmit} getFieldDecorator={getFieldDecorator} type='Fixed Savings'/>
                            </TabPane>
						</Tabs>
					</Card>
				</div>
			</div>
        )
    }
}
const mapStateToProps = ({state})=>{
    return {state}	
}
export default connect(mapStateToProps, {})(Form.create()(WithdrawPage))
