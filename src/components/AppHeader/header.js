import React from "react";

const AppHeader = ({name, total, aboutTotal}) => {
  return (
    <div className="gx-profile-banner">
      <div className="gx-profile-container">
        <div className="gx-profile-banner-top">
          <div className="gx-profile-banner-top-left">
            <div className="gx-profile-banner-avatar-info">
              <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-medium uppercase">
                {name}
              </h2>
            </div>
          </div>
          <div className="gx-profile-banner-top-right">
            <ul className="gx-follower-list">
              <li>
                <h1 className="gx-follower-title gx-fs-lg gx-font-weight-light fs-bg">{total}</h1>
                <span className="gx-fs-sm">{aboutTotal}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="gx-profile-banner-bottom">
          <div className="gx-tab-list">
            <ul className="gx-navbar-nav">
              <li>
                <span className="gx-link">Timeline</span>
              </li>
              <li>
                <span className="gx-link">About</span>
              </li>
            </ul>
          </div>
          <span className="gx-link gx-profile-setting">
            <i className="icon icon-setting gx-fs-lg gx-mr-2 gx-mr-sm-3 gx-d-inline-flex gx-vertical-align-middle"/>
            <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">Setting</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default AppHeader;
