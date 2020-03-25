import React from "react";
import {Button} from "antd";

import Widget from "components/Widget/index";


const NewPhotos = ({heading, content, icon, color, subHeading}) => {
  return (
    <Widget styleName="gx-widget-bg">

      <span className="gx-widget-badge">flexible Savings</span>
      <i className={`icon icon-${icon} gx-fs-xlxl`}/>

      <h1 className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-3 gx-mb-sm-4">{heading}</h1>
      <p>{subHeading}</p>
      <p>{content}</p>
      <Button className="gx-mb-1 gx-btn-warning" htmlType="submit">
        Save
      </Button>
    </Widget>
  );
};

export default NewPhotos;
