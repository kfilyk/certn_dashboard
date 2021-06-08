import React, { useState } from 'react';
import { userLogin } from '../../api/Certn-Api/index';
import { UserData } from '../../interfaces';
import { WithUser } from '../../userContext';
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
  const { setUserData, userLogout, token } = WithUser();

  const submit = async (values: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      setLoading({ login: true });
      const response: UserData = await userLogin(values.email, values.password);
      notification.success({
        message: 'Login Successful!',
        description: 'Welcome to the Certn support tool',
      });
      setUserData({
        user: response?.user,
        token: response?.token,
        expiry: response?.expiry,
      });
      // Route to different page here
      // history.push(/)
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
        {/* Logout button is temp!! */}
        {token ? (
          <button
            style={{
              color: '#1BB793',
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
            onClick={() => userLogout()}
          >
            Log out
          </button>
        ) : (
          ''
        )}
        {/* End of logout button */}
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
