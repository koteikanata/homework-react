import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useLoginMutation } from '../../features/api/filmsApi';
import { setCredentials } from '../../features/auth/authSlice';
import styles from './styles.module.css';

interface Props {
    onClose: () => void;
}

export const AuthForm: React.FC<Props> = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { token } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ token }));
            onClose();
        } catch (err) {
            console.error('Failed to login', err);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <p className={styles['input-name']}>
                    Логин <span>*</span>
                </p>
                <input
                    type="text"
                    placeholder="Введите логин"
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <p className={styles['input-name']}>
                    Пароль <span>*</span>
                </p>
                <input
                    type="password"
                    placeholder="Введите пароль"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className={styles['button-container']}>
                <button
                    type="submit"
                    className={classNames(styles['button-login'], styles.button)}
                    disabled={isLoading}
                >
                    Войти
                </button>
                <button type="button" className={classNames(styles['button-cancel'], styles.button)} onClick={onClose}>
                    Отменить
                </button>
            </div>
        </form>
    );
};
