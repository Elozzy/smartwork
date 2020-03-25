import React from "react";
import {Col, Row} from "antd";
import BalanceHistory from "components/dashboard/Crypto/BalanceHistory";
import SendMoney from "components/dashboard/Crypto/SendMoney";
import RewardCard from "components/dashboard/Crypto/RewardCard";
import OrderHistory from "components/dashboard/Crypto/OrderHistory";
import Auxiliary from "util/Auxiliary";
import AppHeader from "./components/Header";
import WalletCard from "./components/WalletCard";

const DashboardPage = () => {
  return (
    <Auxiliary>
      <Auxiliary>
        <AppHeader name="Dashboard Page" />
        <div className="gx-profile-content">
          <Row>
            <Col md={10} sm={24} xs={24}>
              <WalletCard/>
            </Col>
            <Col md={14} sm={24} xs={24}>
              <SendMoney/>
            </Col>
          </Row>
        </div>
      </Auxiliary>
      <Auxiliary>
        <Row>
          <Col xl={12} lg={24} md={12} sm={24} xs={24}>
            <BalanceHistory/>
          </Col>
          <Col xl={9} lg={24} md={24} sm={24} xs={24}>
            <SendMoney/>
          </Col>
          <Col xl={6} lg={12} md={12} sm={24} xs={24}>
            <RewardCard/>
          </Col>
          <Col xl={9} lg={24} md={24} sm={24} xs={24}>
            <OrderHistory/>
          </Col>
        </Row>
      </Auxiliary>
      
    </Auxiliary>
  );
};

export default DashboardPage;
