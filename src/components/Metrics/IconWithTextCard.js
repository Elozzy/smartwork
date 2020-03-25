import React from "react";

import Widget from "components/Widget/index";
import {connect} from "react-redux";
import {THEME_TYPE_DARK} from "../../constants/ThemeSetting";

const IconWithTextCard = (props) => {
  const {icon, title, subTitle, color, textColor} = props;
  let {iconColor} = props;
  if (props.themeType === THEME_TYPE_DARK) {
    iconColor = "white";
  }

  return (
    <Widget styleName={`gx-card-full gx-py-4 gx-px-2 gx-bg-${color}`}>
      <div className="gx-media gx-align-items-center gx-flex-nowrap">
        <div className="gx-mr-lg-4 gx-mr-3">
          <i className={`icon icon-${icon} gx-fs-xlxl gx-text-${iconColor} gx-d-flex`}
             style={{fontSize: 45}}/>
        </div>
        <div className="gx-media-body">
          <h1 className={`gx-text-${textColor} gx-fs-xxxl gx-font-weight-medium gx-mb-1`}>{title}</h1>
          <p className={`gx-text-${textColor} gx-mb-0`}>{subTitle}</p>
        </div>
      </div>
    </Widget>
  );
};

const mapStateToProps = ({settings}) => {
  const {themeType} = settings;
  return {themeType}
};
export default connect(mapStateToProps, null)(IconWithTextCard);
