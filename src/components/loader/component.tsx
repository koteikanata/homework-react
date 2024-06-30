import styles from './styles.module.css';

export const Loader = () => {
    return (
        <div className={styles['loader-container']}>
            <img
                className={styles.loader}
                src="../../../public/loading.svg"
                alt="Загрузка..."
            />
        </div>
    );
};
