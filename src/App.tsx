import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import 'antd/dist/antd.css';
// Browser routing typically happens in this file.

import { notification } from 'antd';

notification.config({
  placement: 'topRight',
  duration: 3,
});

export function App(): JSX.Element {
  return (
    <div className='App'>
      <Login />
    </div>
  );
}
