import React, { useState } from 'react';
import { userLogin } from '../../api/Certn-Api/index';
import logo from '../../logo.svg';
import './Login.css';

// Ant Design Imports
import { Spin, notification } from 'antd';

// Components
import LoginForm from './LoginForm';

interface Loading {
  login: boolean;
}

const Login = (): JSX.Element => {
  // Loading state, error handling
  const [loading, setLoading] = useState<Loading>({ login: false });

  const submit = async (values: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      setLoading({ login: true });
      const response = await userLogin(values.email, values.password);
      notification.success({
        message: 'Login Successful!',
        description: `API Token: ${response.token}`,
      });
    } catch (e) {
      notification.error({
        message: 'Login Failed!',
        description:
          'Please create and account or click on "forgot your password" to reset your password.',
      });
    }
    setLoading({ login: false });
  };

  return (
    <Spin spinning={loading.login}>
      <div className='login-page'>
        <img src={logo} className='login-logo' alt='logo' />
        <p style={{ color: '#1BB793' }}>Login to access Support Tool</p>
        <div>
          <LoginForm onSubmit={submit} />
        </div>
      </div>
    </Spin>
  );
};

export default Login;
