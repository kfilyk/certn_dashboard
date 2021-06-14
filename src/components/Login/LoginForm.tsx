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
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item>
            <LoginButton type="primary" htmlType="submit" size="large">
                Log in
            </LoginButton>
        </Form.Item>
        <Form.Item>
            <StyledLink href="https://whitelabel.certn.co/welcome/signUp">Create Account</StyledLink>
        </Form.Item>
        <Form.Item>
            <StyledLink href="https://whitelabel.certn.co/forgot">Forgot your password?</StyledLink>
        </Form.Item>
    </Form>
);

export default LoginForm;
