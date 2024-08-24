import React, { useState } from "react";
import { register } from '../../services/actions/user';
import { RootState } from '../../services/types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import YandexLogo from "../../img/yandexLogo.png";
import VkLogo from "../../img/vkLogo.png";

const RegisterForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [againPassword, setAgainPassword] = useState('');

    const { loading, error } = useSelector((state: RootState) => state.user);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register({ email, password }) as any);
        navigate(`/verification`, {
            state: { backgroundLocation: location, email: email },
          });
    }

    const loginFromSocial = () => {
        console.log("vk")
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
                <div className={styles.socialLogin}>
                    <p className={styles.socialLoginText}>Войти через социальные сети</p>
                    <div className={styles.socialIcons}>
                        <button type="button" className={styles.socialButton} onClick={loginFromSocial}>
                            <img src={VkLogo} alt="VK" className={styles.socialLogo} />
                        </button>
                        <button type="button" className={styles.socialButton} onClick={loginFromSocial}>
                            <img
                                src={YandexLogo}
                                alt="Yandex"
                                className={styles.socialLogo}
                            />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;