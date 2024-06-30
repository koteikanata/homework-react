import classNames from 'classnames';

import styles from './styles.module.css';

export const Filter = () => {
    return (
        <div className={classNames(styles['filter-card'])}>
            <p className={styles.title}>Фильтр</p>

            <div className={classNames(styles.body)}>
                <div className={classNames(styles.item)}>
                    <p>Жанр</p>
                    <div className={classNames(styles.select)}>
                        Выберите жанр
                    </div>
                </div>
                <div className={classNames(styles.item)}>
                    <p>Год выпуска</p>
                    <div className={classNames(styles.select)}>
                        {' '}
                        Выберите год
                    </div>
                </div>
            </div>
        </div>
    );
};
