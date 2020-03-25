import React, { Component } from 'react';
import Widget from "components/Widget/index";
import {Col, Row} from "antd";
import {getUserDetails, getWallet} from 'util/functions/user';

export default class WalletCard extends Component {
    render() {
        const setCardDate = (!getUserDetails()) ? new Date() : new Date(JSON.parse(getUserDetails()).created_at);
        const cardDate = `${setCardDate.getMonth() + 1}/${setCardDate.getUTCFullYear()} `
        const wallet  = getWallet()
        return (
            <Widget styleName="gx-bg-white wallet-card">
                <div className="gx-flex-row gx-mb-3 gx-mb-md-4">
                    <img alt="" style={{ width:"10%"}} src={require("assets/images/card-logo.png")}/>
                    <small className="smart-wallet-text"><em>NGN {wallet.balance}</em></small>
                </div>
                <div className="gx-text-center" style={{ color:'#fff'}}>
                    <h2 className="h1 gx-mb-3 gx-text-white">{ wallet.account_signature }</h2>
                    <Row>
                        <Col xs={6}>
                            <img alt="" src={require("assets/images/smartmotion.png")} 
                                style={{marginTop: "-15px", width: '42px'}}

                            />
                        </Col>
                        <Col xs={18}>
                            <p className="gx-text-white gx-mb-3">
                                Smart Wallet ID: {wallet.account_number}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <p>{(!wallet) ? '...' :wallet.account_name }</p>
                        </Col>
                        <Col xs={12}>
                            <em>
                                <small>Issued: </small>
                            {cardDate}
                            </em>
                        </Col>
                    </Row>
                </div>
            </Widget>
        )
    }
}
