import classNames from 'classnames';
import styles from './styles.module.css';
import { Auth } from '../auth/component';
import type { RootState } from '../../store/store';
import { logout, setTokenFromStorage } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setTokenFromStorage(token));
        }
        setIsLoading(false);
    }, [dispatch]);

    const handleTitleClick = () => navigate('/');
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleLogout = () => dispatch(logout());

    if (isLoading) {
        return null;
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title} onClick={handleTitleClick}>
                Фильмопоиск
            </h1>
            {!isAuthenticated ? (
                <button className={classNames(styles.button, styles['button-login'])} onClick={handleOpenModal}>
                    Войти
                </button>
            ) : (
                <div className={styles['logedin-container']}>
                    <span className={styles.avatar}></span>
                    <button className={classNames(styles.button, styles['button-logout'])} onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            )}
            {isModalOpen && <Auth onClose={handleCloseModal} />}
        </header>
    );
};
