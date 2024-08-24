import { useState, FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styles from "./VerificationForm.module.css";

const VerificationForm: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state as { email: string };
    const [code, setCode] = useState(Array(6).fill(''));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (value.length === 1 && /^[0-9]$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (index < code.length - 1) {
                const nextSibling = document.querySelector(`input[name="code-${index + 1}"]`);
                if (nextSibling) {
                    (nextSibling as HTMLInputElement).focus();
                }
            }
        } else if (value.length === 0) {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);

            if (index > 0) {
                const prevSibling = document.querySelector(`input[name="code-${index - 1}"]`);
                if (prevSibling) {
                    (prevSibling as HTMLInputElement).focus();
                }
            }
        }
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                navigate(`/`);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Verification code submitted:", code.join(''));
    };

    const reSend = () => {
        console.log(123);
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className={styles.verificationForm}>
            <form onSubmit={handleSubmit} autoComplete="off">
                <p className={styles.emailText}>Введите код из электронного письма</p>
                <p className={styles.emailAddress}>{email}</p>
                <p className={styles.changeEmail} onClick={goBack}>Изменить почту</p>
                <div className={styles.codeInputGroup}>
                    {code.map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={code[index]}
                            onChange={(e) => handleChange(e, index)}
                            className={styles.codeInput}
                            name={`code-${index}`}
                        />
                    ))}
                </div>
                <div className={styles.divNonCode}>
                    <p className={styles.resendText} >
                        Не получили код?
                    </p>
                    <p className={styles.agreementTextLink} onClick={reSend}>Отправить код повторно</p>
                </div>
                <button type="submit" className={styles.submitButton}>
                    Зарегистрироваться
                </button>
                <p className={styles.agreementText}>
                    Регистрируясь, вы принимаете
                    <a href="/agree" target="_blank" rel="noopener noreferrer" className={styles.agreementTextLink}>
                        &nbsp;Соглашение
                    </a>
                </p>
            </form>
        </div>
    );
};

export default VerificationForm;