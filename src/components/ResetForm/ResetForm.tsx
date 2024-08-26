import { useState, FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styles from "./ResetForm.module.css";

const ResetForm: FC = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [againPassword, setAgainPassword] = useState("");

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                navigate(`/`);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={styles.verificationForm}>
            <p className={styles.emailText}>Восстановление пароля</p>
            <form onSubmit={handleResetPassword} autoComplete="off">
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Придумайте новый пароль"
                        className={styles.inputField}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                    />
                    <input
                        type="password"
                        placeholder="Повторите новый пароль"
                        className={styles.inputField}
                        onChange={(e) => setAgainPassword(e.target.value)}
                        name="againPassword"
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Подтвердить
                </button>
            </form>
            <p className={styles.agreementText}>
                Подтверждая, вы принимаете
                <a
                    href="/agree"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.agreementTextLink}
                >
                    &nbsp;Соглашение
                </a>
            </p>
        </div>
    );
};

export default ResetForm;
