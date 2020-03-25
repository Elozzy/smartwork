import React from "react";
import {Button} from "antd";

import Widget from "components/Widget/index";


const FlyingBird = ({content, heading }) => {
  return (
    <Widget>
      <div className="gx-media gx-align-items-center gx-mb-4">
        <div className="gx-mr-3">
          <img src={require("assets/images/widget/flying.png")} alt='flying'/>
        </div>
        <div className="gx-media-body">
          <h2 className="gx-mb-1">
            {heading}
          </h2>
          <p className="gx-text-grey gx-mb-0">Smart Target</p>
        </div>
      </div>
      <p className="gx-mb-4">{content}</p>
      <Button type="primary" className="gx-mb-1" htmlType="submit">
        Save
      </Button>
    </Widget>
  );
};

export default FlyingBird;
