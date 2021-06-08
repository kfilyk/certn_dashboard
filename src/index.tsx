import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { App } from './App';

import { notification } from 'antd';

notification.config({
  placement: 'topRight',
  duration: 3,
});

ReactDOM.render(<App />, document.getElementById('root'));
