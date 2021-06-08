import React, { useState } from 'react';
// import { setConstantValue } from 'typescript';
import { userLogin } from '../../api/Certn-Api/index';

// Ant Design Imports
import { Form, Input, Button, Spin, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface Loading {
  login: boolean;
}

const LoginForm = (): JSX.Element => {
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
      <Form
        name='login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={submit}
      >
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <a href='https://whitelabel.certn.co/login'>Create Account</a>
        </Form.Item>
        <Form.Item>
          <a
            className='login-form-forgot'
            href='https://whitelabel.certn.co/forgot'
          >
            Forgot your password?
          </a>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default LoginForm;
