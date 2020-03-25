import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./DashboardPage'))}/>
      <Route path={`${match.url}deposit`} component={asyncComponent(() => import('./DepositPage'))}/>
      <Route path={`${match.url}settings`} component={asyncComponent(() => import('./SettingsPage'))}/>
      <Route path="/savings/:type" component={asyncComponent(() => import('./SavingsPage'))}
      />
      <Route path="/checkout/:type" component={asyncComponent(() => import('./CheckOutPage'))}
      />
      <Route path={`${match.url}withdrawal`} component={asyncComponent(() => import('./WithdrawPage'))}
      />
      <Route path={`${match.url}transfer`} component={asyncComponent(() => import('./TransferPage'))}
      />
    </Switch>
  </div>
);

export default App;
