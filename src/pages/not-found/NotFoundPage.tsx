import styles from './styles.module.css';

export function NotFoundPage() {
    return (
        <div className={styles.header}>
            <h1>404 - Страница не найдена</h1>
            <p>💔</p>
        </div>
    );
}
