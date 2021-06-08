// Ant Design Imports
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
}
const LoginForm = (Props: LoginFormProps): JSX.Element => (
  <Form
    name='login'
    className='login-form'
    initialValues={{ remember: true }}
    onFinish={Props.onSubmit}
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
      <Button type='primary' htmlType='submit' className='login-form-button'>
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
);

export default LoginForm;
