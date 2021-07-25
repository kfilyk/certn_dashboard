import React, { useState } from 'react';
import { userLogin } from '../../api/Certn-Api/index';
import { UserData } from '../../interfaces';
import { WithUser } from '../../userContext';
import logo from '../../logo.svg';
import { useHistory } from 'react-router-dom';

// Ant Design Imports
import { notification } from 'antd';

// Components
import LoginForm from './LoginForm';

// Styled Components
import { StyledPara, Image, LoginDiv, FormWrapper, Spinner } from './LoginSC';
import { useEffect } from 'react';

// Interfaces
interface Loading {
    login: boolean;
}

const Login = (): JSX.Element => {
    // Loading state, error handling
    const [loading, setLoading] = useState<Loading>({ login: false });
    const { setUserData } = WithUser();
    const history = useHistory();
    useEffect(() => {
        history.replace('/login');
    }, [history]);
    const submit = async (values: { email: string; password: string }): Promise<void> => {
        try {
            setLoading({ login: true });
            const response: UserData = await userLogin(values.email, values.password);
            setLoading({ login: false });
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
            history.push('/search');
        } catch (e) {
            setLoading({ login: false });
            notification.error({
                message: 'Login Failed!',
                description: 'Please create an account or click on "forgot your password" to reset your password.',
            });
        }
    };

    return (
        <Spinner spinning={loading.login} size="large">
            <LoginDiv>
                <Image src={logo} alt="logo" />
                <StyledPara>Login to access Support Tool</StyledPara>
                <FormWrapper>
                    <LoginForm onSubmit={submit} />
                </FormWrapper>
            </LoginDiv>
        </Spinner>
    );
};

export default Login;
