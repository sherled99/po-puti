import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import logo from '../../img/logo.png';
import { AppDispatch, RootState } from '../../services/types';
import { fetchCurrentUser, logout } from '../../services/actions/user';

type NavLink = { label: string; href: string; type?: 'anchor' | 'route' };

const navLinks: NavLink[] = [
  { label: 'Преимущества', href: '#advantages', type: 'anchor' },
  { label: 'Для кого', href: '#for-whom', type: 'anchor' },
  { label: 'Как это работает', href: '#how-to', type: 'anchor' },
  { label: 'FAQ', href: '#faq', type: 'anchor' },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, profile, email, token } = useSelector((state: RootState) => state.user);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(() => Boolean(isAuthenticated && token && !profile));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hasRequestedProfile = useRef(false);

  useEffect(() => {
    if (isAuthenticated && token && !profile && !hasRequestedProfile.current) {
      hasRequestedProfile.current = true;
      setIsProfileLoading(true);
      dispatch(fetchCurrentUser())
        .catch(() => {
          /* handled elsewhere */
        })
        .finally(() => setIsProfileLoading(false));
      return;
    }

    if (!isAuthenticated || !token) {
      hasRequestedProfile.current = false;
      setIsProfileLoading(false);
    }
  }, [dispatch, isAuthenticated, profile, token]);

  const openAuthModal = () => {
    if (isAuthenticated) {
      navigate('/profile');
      return;
    }
    navigate('/login', { state: { backgroundLocation: location } });
  };

  const handlePrimaryAction = () => {
    if (isAuthenticated) {
      navigate('/search');
      return;
    }
    openAuthModal();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const hasName = Boolean(profile?.firstName || profile?.lastName);
  const isProfilePending = isProfileLoading || (isAuthenticated && token && !profile);
  const shouldShowEmailFallback = profile && !hasName;
  const fullName = hasName
    ? `${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`.trim()
    : shouldShowEmailFallback
    ? email || 'Профиль'
    : isProfilePending
    ? ''
    : email || 'Профиль';

  const goHome = () => navigate('/');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.logoButton} onClick={goHome} aria-label="Вернуться на главную">
          <img src={logo} alt="Попути" className={styles.logo} />
        </button>
        {location.pathname === "/" && (
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>
        )}
        <div className={styles.actions}>
          <button className={styles.primaryAction} onClick={handlePrimaryAction}>
            Найти попутчика
          </button>
          {!isAuthenticated && (
            <button className={styles.secondaryAction} onClick={openAuthModal}>
              Войти
            </button>
          )}
          {isAuthenticated && (
            <div className={styles.userMenu} ref={menuRef}>
              <button
                type="button"
                className={styles.userButton}
                onClick={toggleMenu}
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
              >
                <span className={styles.userButtonLabel}>{fullName}</span>
                <span className={`${styles.caret} ${isMenuOpen ? styles.caretOpen : ''}`} aria-hidden="true" />
              </button>
              {isMenuOpen && (
                <div className={styles.dropdown} role="menu">
                  <button
                    type="button"
                    className={styles.dropdownItem}
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/my-cards');
                    }}
                  >
                    Мои карточки
                  </button>
                  <button
                    type="button"
                    className={styles.dropdownItem}
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/create');
                    }}
                  >
                    Создать объявление
                  </button>
                  <button
                    type="button"
                    className={styles.dropdownItem}
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/profile');
                    }}
                  >
                    Редактировать
                  </button>
                  <button
                    type="button"
                    className={styles.dropdownItem}
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
