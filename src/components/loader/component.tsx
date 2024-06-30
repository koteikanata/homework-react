import styles from './styles.module.css';

import Loading from '../../assets/loading.svg?react';

const loadingIcon = <Loading />;

export const Loader = () => {
    return (
        <div className={styles['loader-container']}>
            <div className={styles.loader}>{loadingIcon}</div>
        </div>
    );
};
