import React, { useState } from 'react';
// import { setConstantValue } from 'typescript';
import { userLogin } from '../../api/Certn-Api/index';

// Ant Design Imports
import { Spin, notification } from 'antd';

// Components
import LoginForm from './LoginForm';

interface Loading {
  login: boolean;
}

const Login = (): JSX.Element => {
  // Loading state, error handling
  const [loadingLogin, setLoadingLogin] = useState<Loading>({ login: false });

  const submit = async (values: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      setLoadingLogin({ login: true });
      const response = await userLogin(values.email, values.password);
      // This is where we need to store the response.
      notification.success({
        message: 'Login Successful!',
        description: `${response.token}`,
      });
    } catch (e) {
      notification.error({
        message: 'Login Failed!',
        description:
          'Please create and account or click on "forgot your password" to reset your password.',
      });
    }
    setLoadingLogin({ login: false });
  };

  return (
    <Spin spinning={loadingLogin.login}>
      <LoginForm onSubmit={submit} />
    </Spin>
  );
};

export default Login;
