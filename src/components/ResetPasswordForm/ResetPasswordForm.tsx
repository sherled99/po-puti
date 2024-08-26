import { useState, FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styles from "./ResetPasswordForm.module.css";

const ResetPasswordForm: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");

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
        navigate(`/enterResetedPassword`, {
            state: { backgroundLocation: location, email: email },
        });
    };

    return (
        <div className={styles.verificationForm}>
            <p className={styles.emailText}>Восстановление пароля</p>
            <p className={styles.emailAddress}>
                Введите электронную почту от вашего акаунта.
            </p>
            <p className={styles.emailAddress}>
                Мы вышлем ссылку для сброса пароля.
            </p>
            <form onSubmit={handleResetPassword} autoComplete="off">
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder="Электронная почта"
                        className={styles.inputField}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Сбросить пароль
                </button>
            </form>
            <p className={styles.agreementText}>
                Сбрасывая пароль, вы принимаете
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

export default ResetPasswordForm;
