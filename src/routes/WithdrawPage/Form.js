import React from 'react'
import {Button, Card, Form, Input, InputNumber} from "antd";

const FormItem = Form.Item;

const WithdrawalForm = ({type, getFieldDecorator, handleSubmit}) => {
    return (
        <Card className="gx-card " title={type}>
            <Form onSubmit={handleSubmit}>        
                <FormItem
                    label="Amount "
                    labelCol={{md: 24, sm:6}}
                    wrapperCol={{xs: 24, sm: 24}}
                    labelAlign='left'
                >
                {getFieldDecorator('amount', {
                    rules: [{required: true, message: 'Specify your amount to withdraw!'}],
                })(
                    <InputNumber style={{ width: "100%"}}  placeholder="Amount to Withdraw" />
                )}
                </FormItem>
                <FormItem
                    label="Remark"
                    labelCol={{sm:6}}
                    wrapperCol={{xs: 24, sm: 24}}
                    labelAlign='left'
                >
                {getFieldDecorator('purpose', {
                    rules: [{required: true, message: 'What is the reason you are saving.'}],
                })(
                    <Input
                        placeholder="Withdraw to Pay Stuff" 
                    />
                )}
                </FormItem>
                <FormItem
                    wrapperCol={{xs: 24, sm: {span: 12, offset: 5}}}
                >
                    <Button onClick={handleSubmit} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        </Card>
    );
}  
export default WithdrawalForm
