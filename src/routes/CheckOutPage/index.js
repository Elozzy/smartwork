import React, { Component } from 'react';
import PaystackButton from 'react-paystack';
import {payStackPubKey} from 'util/config';
import Auxiliary from './../../util/Auxiliary';
import { connect } from 'react-redux';
import { Card, Col, Row} from 'antd';
import Widget from './../../components/Widget/index';
import { getUserDetails, getTempDeposit } from 'util/functions/user';

class CheckOutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: payStackPubKey, //PAYSTACK PUBLIC KEY
            email: JSON.parse(getUserDetails()).email,  // customer email
            amount: 10000 //equals NGN100,
        }
    }
    

    callback = (response) => {
        console.log(response); // card charged successfully, get reference here
    }

    close = () => {
        console.log("Payment closed");
    }

    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    render() {
        const {deposit, payment_mode, account_type, purpose} = getTempDeposit();
        return (
            <Auxiliary>
                <div className="gx-profile-content">
                    <Row>
                        <Col xl={8} lg={10} md={10} sm={24} xs={24}>
                            <Widget title="Preview" styleName="gx-card-profile-sm">
                                <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
                                    <div className="gx-mr-3">
                                        <i className={`icon icon-apps gx-fs-xxl gx-text-grey`}/>
                                    </div>
                                    <div className="gx-media-body">
                                        <span className="gx-mb-0 gx-text-grey gx-fs-sm">Payment Method</span>
                                        <p className="gx-mb-0 text-upper">{payment_mode.replace("_", " ")}</p>
                                    </div>
                                </div>
                                <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
                                    <div className="gx-mr-3">
                                        <i className={`icon icon-culture-calendar gx-fs-xxl gx-text-grey`}/>
                                    </div>
                                    <div className="gx-media-body">
                                        <span className="gx-mb-0 gx-text-grey gx-fs-sm">Account Type</span>
                                        <p className="gx-mb-0 text-upper">{account_type.replace("_", " ")}</p>
                                    </div>
                                </div>
                                <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
                                    <div className="gx-mr-3">
                                        <i className={`icon icon-pricing-table gx-fs-xxl gx-text-grey`}/>
                                    </div>
                                    <div className="gx-media-body">
                                        <span className="gx-mb-0 gx-text-grey gx-fs-sm">Amount</span>
                                        <p className="gx-mb-0">&#8358; {deposit} </p>
                                    </div>
                                </div>
                                <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
                                    <div className="gx-mr-3">
                                        <i className={`icon icon-product-grid gx-fs-xxl gx-text-grey`}/> 
                                    </div>
                                    <div className="gx-media-body">
                                        <span className="gx-mb-0 gx-text-grey gx-fs-sm">Purpose</span>
                                        <p className="gx-mb-0">{purpose}</p>
                                    </div>
                                </div>
                            </Widget>
                        </Col>
                    </Row>
                </div>
                <Card className="gx-card" title= "Please Review your payment Action">
                <Col xl={8} lg={10} md={10} sm={24} xs={24}>
                    <PaystackButton
                        channels={['bank']} 
                        text="Make Payment"
                        class="ant-btn ant-btn-primary"
                        callback={this.callback}
                        close={this.close}
                        // disabled={true}
                        embed={true} 
                        reference={this.getReference()}
                        email={this.state.email}
                        amount={(typeof deposit !== 'number' )? this.state.amount : deposit * 100}
                        paystackkey={this.state.key}
                        tag="button"
                    />
                </Col>
                </Card>
            </Auxiliary>
            
        );
    }
}
const mapStateToProps = (state)=>{
    console.log(state)
    return {
        appState : state
    }
}
export default connect(mapStateToProps, {})(CheckOutPage);