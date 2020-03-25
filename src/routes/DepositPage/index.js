import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Col, Row} from "antd";

import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import IconWithTextCard from "components/Metrics/IconWithTextCard";
import TrafficRaiseCard from "components/Metrics/TrafficRaiseCard";
import TotalEncomeCard from "components/Metrics/TotalEncomeCard";
import QueriesCard from "components/Metrics/QueriesCard";
import FlyingBird from "components/Widgets/FlyingBird";
import UserCard from "components/Widgets/UserCard";
import IconCard from "components/Widgets/IconCard";
import NewPhotos from "components/Widgets/NewPhotos";
import Auxiliary from "util/Auxiliary";
import {getUsersSavings, accountType} from '../../appRedux/actions/savings';

class DepositPage extends React.Component {
  constructor(props) {
	  super(props);	
	  this.state = {
	  	totalGeneralSavings : 0,
	  	totalTargetSavings : 0,
	  	totalFixedSavings : 0,
	  };
  }
  
  componentDidMount(){
    this.props.getUsersSavings();
  }

  render(){
    const {totalGeneralSavings, totalTargetSavings, totalFixedSavings} = this.state; 
    return (
      <div className="gx-main-content gx-pb-sm-4">
      <Row>
        <Col span={24}>
        <UserCard />
          <ContainerHeader title={<IntlMessages id="deposit.page.header"/>} />
        </Col>
      </Row>
        <Auxiliary>
        <Row>
          <Col xl={24/3} lg={24/3} md={24/3} sm={12} xs={12} className="gx-col-full">
          <Link to="/savings/general">
            <IconWithTextCard color="primary" textColor="white" icon="orders" iconColor="white" title={totalGeneralSavings} subTitle="General Savings"/>
          </Link>
          </Col>
          <Col xl={24/3} lg={24/3} md={24/3} sm={12} xs={12} className="gx-col-full">
            <Link to="/savings/target">
            <IconWithTextCard  icon="revenue-new" iconColor="primary" title={totalTargetSavings} subTitle="Target Savings"/>
            </Link>
          </Col>
          <Col xl={24/3} lg={24/3} md={24/3} sm={12} xs={12} className="gx-col-full">
            <Link to="/savings/invest">
            <IconWithTextCard color="geekblue" textColor="white" icon="visits" iconColor="primary" title={totalFixedSavings} subTitle="Fixed Deposit/Mutal Savings"/>
            </Link>
          </Col>
          {/*Savings Chart  */}
          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
            <TrafficRaiseCard/>
          </Col>
          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
            <TotalEncomeCard/>
          </Col>
          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
            <QueriesCard/>
          </Col>
          
          {/*  Savings Format */}
          
          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
            <NewPhotos 
              subHeading="SAVE. AS MUCH AS YOU CAN" 
              content="Flexible savings. Save whenever and however. and withdraw anytime." 
              heading="General Savings" 
              icon="orders" 
            />
          </Col>
          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
            <FlyingBird  content="Save for a paticular purpose or target. It can be a new house, car or marriage. Start now." heading="Targeted Savings" icon="revenue-new" />
          </Col>
          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
            <NewPhotos 
              subHeading="INVEST IN YOUR FUTURE TODAY" 
              content="This accounts allows you to invest your money for the future with large returns"
              heading="Fixed Deposit/Mutal Funds Savings" 
              icon="visits" 
            />
          </Col>
          <Col xl={4} lg={12} md={12} sm={24} xs={24}>
            <Row>
              <Col  xl={12} lg={12} md={12} sm={12} xs={12}>
                <IconCard className="fab" color="gx-bg-primary gx-icon-white" icon="add-circle"/>
              </Col>
            </Row>
          </Col>
  
          {/* <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <BuildingCard/>
          </Col> */}
  
          
        </Row>
      </Auxiliary>
      </div>
    );
  } 
}

function mapStateToProps(state){
  console.log(state)
  return{

  }
}

export default connect(mapStateToProps, {getUsersSavings})(DepositPage);
