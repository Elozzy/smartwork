import React from 'react'
import {Row, Col } from "antd";
import { connect } from 'react-redux'
import Auxiliary from "util/Auxiliary";
import About from "components/profile/About/index";
import Biography from "components/profile/Biography/index";
import Events from "components/profile/Events/index";
import Contact from "components/profile/Contact/index";
import BankInfo from "components/profile/BankInfo/index";
import ProfileHeader from "components/profile/ProfileHeader/index";

class SettingsPage extends React.Component{
    
    render() {
        const { authUser } = this.props;
        return (
           <Auxiliary>
                <ProfileHeader authUser={authUser}  />
                <div className="gx-profile-content">
                    <Row>
                        <Col xl={16} lg={14} md={14} sm={24} xs={24}>
                            <About />
                            <BankInfo/>
                            <Biography/>
                            <Events/>
                        </Col>
                        <Col xl={8} lg={10} md={10} sm={24} xs={24}>
                            <Contact authUser={authUser}/>
                            <Row>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Auxiliary>
        );
    }
}
const mapStateToProps = ({auth})=>{
    const {authUser} =  auth;
    return {authUser}
}
export default connect(mapStateToProps)(SettingsPage);