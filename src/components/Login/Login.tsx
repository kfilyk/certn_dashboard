import React, { useState } from 'react';
import { userLogin } from '../../api/Certn-Api/index';
import { UserData } from '../../interfaces';
import { WithUser } from '../../userContext';
import logo from '../../logo.svg';
import { useHistory } from 'react-router-dom';

// Ant Design Imports
import { Spin, notification } from 'antd';

// Components
import LoginForm from './LoginForm';

// Styled Components
import { LogoutButton, StyledPara, Image, LoginDiv, FormWrapper } from './LoginSC';

// Interfaces
interface Loading {
    login: boolean;
}

const Login = (): JSX.Element => {
    // Loading state, error handling
    const [loading, setLoading] = useState<Loading>({ login: false });
    const { setUserData, userLogout, token } = WithUser();
    const history = useHistory();
    const submit = async (values: { email: string; password: string }): Promise<void> => {
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
            history.push('/dashboard');
        } catch (e) {
            notification.error({
                message: 'Login Failed!',
                description: 'Please create and account or click on "forgot your password" to reset your password.',
            });
        }
        setLoading({ login: false });
    };

    return (
        <Spin spinning={loading.login}>
            <LoginDiv>
                {/* Logout button is temp!! */}
                {token ? <LogoutButton onClick={() => userLogout()}>Log out</LogoutButton> : ''}
                {/* End of logout button */}
                <Image src={logo} alt="logo" />
                <StyledPara>Login to access Support Tool</StyledPara>
                <FormWrapper>
                    <LoginForm onSubmit={submit} />
                </FormWrapper>
            </LoginDiv>
        </Spin>
    );
};

export default Login;
