import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Avatar, Icon, Dropdown, Typography } from 'antd';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import Timekeeping from '../src/component/timeInAndTimeout'


import { UserContext } from '../src/component/userContext'

const App = () => {
  const { Content, Sider, Header } = Layout;

  return (
    <UserContext.Provider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Timekeeping} />
              <Redirect from="*" to="/" />
            </Switch>
          </BrowserRouter>
    </UserContext.Provider>
  );

}

export default App;