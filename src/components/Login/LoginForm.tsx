// Ant Design Imports
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
}

const LoginForm = (Props: LoginFormProps): JSX.Element => (
  <Form
    name='login'
    initialValues={{ remember: true }}
    onFinish={Props.onSubmit}
  >
    <Form.Item
      name='email'
      rules={[{ required: true, message: 'Please input your Email!' }]}
    >
      <Input prefix={<UserOutlined />} placeholder='Email' size='large' />
    </Form.Item>
    <Form.Item
      name='password'
      rules={[{ required: true, message: 'Please input your Password!' }]}
    >
      <Input
        prefix={<LockOutlined />}
        type='password'
        placeholder='Password'
        size='large'
      />
    </Form.Item>
    <Form.Item>
      <Button
        type='primary'
        htmlType='submit'
        size='large'
        style={{
          width: '100%',
          background: '#2fb99a',
          borderColor: '#2fb99a',
        }}
      >
        Log in
      </Button>
    </Form.Item>
    <Form.Item>
      <a href='https://whitelabel.certn.co/login' style={{ color: '#2fb99a' }}>
        Create Account
      </a>
    </Form.Item>
    <Form.Item>
      <a href='https://whitelabel.certn.co/forgot' style={{ color: '#2fb99a' }}>
        Forgot your password?
      </a>
    </Form.Item>
  </Form>
);

export default LoginForm;
