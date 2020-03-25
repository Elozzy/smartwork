import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {userSignOut} from "appRedux/actions/Auth";

class UserProfile extends Component {

  render() {
    const {authUser} = this.props;
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>My Account</li>
        <li>Connections</li>
        <li onClick={() => this.props.userSignOut()}>Logout
        </li>
      </ul>
    );
      
    const UserIcon = (!authUser) ? "Guest" : authUser.name[0]; 

    return (

      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
          <Avatar 
            src="../../assets/images/robot.png"
            className="gx-size-40 gx-pointer gx-mr-3" 
            alt="" 
            style={{ background :'orange' }}       
          >
          {UserIcon}
          </Avatar>
          <span className="gx-avatar-name">{authUser ? authUser.name : "Guest"}<i
            className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></span>
        </Popover>
      </div>

    )

  }
}

const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser}
};

export default connect(mapStateToProps, {userSignOut})(UserProfile);
