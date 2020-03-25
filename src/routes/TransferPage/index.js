import React, { Component } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class TransferPage extends Component {
    render() {
        return (
            <Tabs
                defaultActiveKey="transfer_history"
                tabPosition="left"
                style={{height: '100%'}}
                size="large"
            >
                <TabPane tab="Transfer" key="transfer">
                    <Card className="gx-card " title="">
								<Form onSubmit={this.handleSubmit}>        
									<FormItem
										label="Amount "
										labelCol={{md: 24, sm:6}}
										wrapperCol={{xs: 24, sm: 24}}
										labelAlign='left'
									>
									{getFieldDecorator('transfer', {
										rules: [{required: true, message: 'Specify your amount to Transfer!'}],
									})(
										<InputNumber style={{ width: "100%"}}  placeholder="Amount to Transfer" />
									)}
									</FormItem>
									<FormItem
										label="Account Details"
										labelCol={{sm:6}}
										wrapperCol={{xs: 24, sm: 24}}
										labelAlign='left'
									>
									{getFieldDecorator('account_number', {
										rules: [{required: true, message: ""}],
									})(
										<Input
											placeholder="Email, Account Number" 
										/>
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
                </TabPane>
                <TabPane tab="Transfer History" key="transfer_history">
                    
                </TabPane>
            </Tabs>
        );
    }
}

export default TransferPage;