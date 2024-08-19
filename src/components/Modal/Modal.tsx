import { useEffect } from 'react';
import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { modalRoot } from '../../utils/document-elements';
import CloseIcon from '../../img/close-modal.png';

interface ModalProps {
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.classList.contains(style.modalOverlay)) {
        navigate(-1);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClick);
    };
  }, [navigate]); // Убедитесь, что useEffect вызывается только при монтировании

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <div className={style.container__main}>
        {children}
        <div className={`mr-10 mt-15 ${style.square}`}>
          <img src={CloseIcon} alt="Close" onClick={() => navigate(-1)} />
        </div>
      </div>
    </>,
    modalRoot
  );
};