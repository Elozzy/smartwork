import React from "react";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import Widget from "components/Widget/index";
import { balanceHistory } from "../../../util/functions/user";

const data = (balanceHistory() == '') ? [] : balanceHistory();


const BalanceHistory = () => {


  return (
    <Widget styleName="gx-card-full">

      <div className="ant-row-flex gx-px-4 gx-pt-4">
        <h2 className="h4 gx-mb-3">Balance History</h2>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data}
                   margin={{top: 0, right: 0, left: 0, bottom: 0}}>
          <Tooltip/>
          <XAxis dataKey="name"/>
          <defs>
            <linearGradient id="color15" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38AAE5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#F5FCFD" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <Area dataKey='balance' strokeWidth={2} stackId="2" stroke='#10316B' fill="url(#color15)"
                fillOpacity={1}/>
        </AreaChart>
      </ResponsiveContainer>
    </Widget>
  );
};

export default BalanceHistory;
