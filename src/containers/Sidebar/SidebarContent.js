import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import {AppsNavigation, AppsBottomNavigation} from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

class SidebarContent extends Component {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const {themeType, navStyle, pathname} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (<Auxiliary>

        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            <AppsNavigation/>
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">

              <Menu.Item key="dashboard" className="ant-menu-item">
                <Link to="/dashboard"><i className="icon icon-home"/>
                  <IntlMessages id="sidebar.dashboard"/></Link>
              </Menu.Item>
              

              <Menu.Item key="deposit">
                <Link to="/deposit"><i className="icon icon-revenue-new"/>
                  <IntlMessages id="sidebar.depositPage"/></Link>
              </Menu.Item>

              <Menu.Item key="withdrawal">
                <Link to="/withdrawal"><i className="icon icon-pricing-table"/>
                  <IntlMessages id="sidebar.withdrawalPage"/></Link>
              </Menu.Item>

              <Menu.Item key="transfer">
                <Link to="/transfer"><i className="icon icon-transfer"/>
                  <IntlMessages id="sidebar.transferPage"/></Link>
              </Menu.Item>

              <Menu.Item key="setting">
                <Link to="/settings"><i className="icon icon-setting"/>
                  <IntlMessages id="sidebar.settingPage"/></Link>
              </Menu.Item>

            </Menu>
          </CustomScrollbars>
         
            <AppsBottomNavigation/>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  return {navStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);

