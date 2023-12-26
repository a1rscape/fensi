import React, { useState } from 'react';
import '../css/Login.css';
import { database } from './FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';

function Login() {
    const [emailCheck, setEmailCheck] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState(false);

    const handleEmailChange = (e) => {
        setEmailCheck(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPasswordCheck(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const history = useNavigate();

    const handleSubmit = (e, type) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (type === 'Register')
            createUserWithEmailAndPassword(database, email, password).then(() => {
                history('/Home');
            }).catch(error => {
                setLogin(true);
                if (error.code === "auth/email-already-in-use")
                    return alert('Email in use,\nTry to login.');
                if (error.code === 'auth/invalid-email')
                    return alert('Invalid email.');
                if (error.code === 'auth/missing-password')
                    return alert('Missing password.');
                return alert(error.code);
            })

        else
            signInWithEmailAndPassword(database, email, password).then(() => {
                history('/Home');
            }).catch(error => {
                if (error.code === 'auth/invalid-email')
                    return alert('Invalid email.');
                if (error.code === 'auth/missing-password')
                    return alert('Missing password.');
                if (error.code === 'auth/invalid-login-credentials')
                    return alert('Not correct.');

                return alert(error.code);
            })

    };

    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    return (
        <>
            <div className="login-form-container">
                <div className='row'>
                    <div className={login === false ? 'active' : 'inactive'} onClick={() => setLogin(false)}>Register</div>
                    <div className={login === true ? 'active' : 'inactive'} onClick={() => setLogin(true)}>Login</div>
                </div>
                <div className='option'>
                    <h1>{login ? 'Login' : 'Register'}</h1>
                </div>
                <form onSubmit={e => {
                    handleSubmit(e, login ? 'Login' : 'Register');
                }}>
                    <div className='allContainer'>
                        <div className={`input-container ${emailCheck === '' ? 'empty' : ''}`}>
                            <input
                                className='inputsLogin'
                                name='email'
                                style={{ color: 'white' }}
                                type="text"
                                placeholder="Email"
                                value={emailCheck.toLowerCase()}
                                onChange={handleEmailChange}
                                autoComplete='off'
                            />
                            {!isEmailValid.test(emailCheck) && (
                                <div className="error">Example : chance@fensi.com</div>
                            )}
                        </div>
                        <div className={`input-container ${passwordCheck === '' ? 'empty' : ''}`}>
                            <input
                                className='inputsLogin'
                                name='password'
                                style={{ color: 'white' }}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={passwordCheck}
                                onChange={handlePasswordChange}
                            />
                            <AiFillEyeInvisible className='eye' onClick={togglePasswordVisibility} />
                            {!isPasswordValid.test(passwordCheck) && (
                                <div className="error">Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.</div>
                            )}
                        </div>
                        <button className='submit' type="submit">{login ? 'Login' : 'Register'}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;