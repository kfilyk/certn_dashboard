import React, { useState } from 'react';
// import { setConstantValue } from 'typescript';
import { Login } from '../../api/Certn-Api/index';

const LoginForm = () => {

  const [formInputs, setFormInputs] = useState({
    email: '',
    password: ''
  })

  const emailHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setFormInputs({
      email: event.currentTarget.value,
      password: formInputs.password
    })
  }

  const passwordHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setFormInputs({
      email: formInputs.email,
      password: event.currentTarget.value
    })
  }

  const submit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    Login(formInputs.email, formInputs.password)
  }

  return (
    <div>
      <form>
        <input type="text" name="username" placeholder="Email" onChange={emailHandler} value={formInputs.email}/>
        <input type="password" name="password" placeholder="Password" onChange={passwordHandler}value={formInputs.password}/>
        <input type="submit" onClick={submit}/>
      </form>
    </div>
  );
}

export default LoginForm;