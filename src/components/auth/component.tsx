import ReactDOM from 'react-dom';
import React, { useEffect, useRef } from 'react';
import { AuthForm } from '../auth-form/component';

import styles from './styles.module.css';

interface Props {
    onClose: () => void;
}

export const Auth: React.FC<Props> = ({ onClose }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', checkIfClickedOutside);
        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        };
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const root = document.getElementById('root') as HTMLElement;

    return ReactDOM.createPortal(
        <div className={styles['modal-container']}>
            <div
                className={styles.modal}
                ref={ref}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <p>Авторизация</p>
                    <img
                        src="../../../public/close.svg"
                        alt="Закрыть"
                        className={styles.close}
                        onClick={onClose}
                    />
                </div>
                <AuthForm onClose={onClose} />
            </div>
        </div>,
        root,
    );
};
