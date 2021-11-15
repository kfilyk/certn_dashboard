// Ant Design Imports
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// Styled Components
import { LoginButton, StyledLink } from './LoginSC';

interface LoginFormProps {
    onSubmit: (values: { email: string; password: string }) => Promise<void>;
}

const LoginForm = (Props: LoginFormProps): JSX.Element => (
    <Form name="login" initialValues={{ remember: true }} onFinish={Props.onSubmit}>
        <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
            <Input prefix={<UserOutlined />} placeholder="kelvinfilyk@gmail.com" size="large" type="email" allowClear />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Seng499!!!" size="large" allowClear />
        </Form.Item>
        <Form.Item>
            <LoginButton type="primary" htmlType="submit" size="large">
                Log in
            </LoginButton>
        </Form.Item>
        <Form.Item>
            <StyledLink href="https://whitelabel.certn.co/welcome/signUp">Create account</StyledLink>
        </Form.Item>
        <Form.Item>
            <StyledLink href="https://whitelabel.certn.co/forgot">Forgot your password?</StyledLink>
        </Form.Item>
    </Form>
);

export default LoginForm;
