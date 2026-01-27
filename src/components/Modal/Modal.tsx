import { useEffect } from 'react';
import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { modalRoot } from '../../utils/document-elements';
import CloseIcon from '../../img/close-modal.png';

interface ModalProps {
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === "/verification") return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [navigate, location.pathname]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <div className={style.container__main}>
        {children}
        <div className={`mr-10 mt-15 ${style.square}`}>
          <img src={CloseIcon} alt="Close" onClick={() => navigate("/")} />
        </div>
      </div>
    </>,
    modalRoot
  );
};
