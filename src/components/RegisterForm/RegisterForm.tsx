import React, { useState } from "react";
import { register } from '../../services/actions/user';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./RegisterForm.module.css";

const RegisterForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [againPassword, setAgainPassword] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== againPassword) {
            alert("Пароли не совпадают");
            return;
        }
        dispatch(register({ email, password }) as any);
        navigate(`/verification`, {
            state: { backgroundLocation: location, email: email },
        });
    }

    return (
        <div className={styles.loginForm}>
            <form onSubmit={handleRegister} autoComplete="off">
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder="Электронная почта"
                        className={styles.inputField}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"

                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Придумайте пароль"
                        className={styles.inputField}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"

                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Подтвердить пароль"
                        className={styles.inputField}
                        onChange={(e) => setAgainPassword(e.target.value)}
                        name="againPassword"
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Зарегистрироваться
                </button>
                <p className={styles.agreementText}>
                    Регистрируясь, вы принимаете
                    <a
                        href="/agree"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.agreementTextLink}
                    >
                        &nbsp;Соглашение
                    </a>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
