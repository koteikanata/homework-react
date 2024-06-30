import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { FilmRating } from '../film-rating/components';
import type { Film } from '../../types';

import styles from './styles.module.css';

interface Props extends Film {
    href: string;
}

export const FilmCard: React.FC<Props> = ({ id, title, description, poster, genre, release_year, href }) => {
    return (
        <div className={classNames(styles['film-card'])}>
            <Link to={href} className={styles.container}>
                <div className={styles.container}>
                    <img src={poster} alt={`Постер ${title}`} width={100} height={120} className={styles.image} />
                    <div className={styles.body}>
                        <p className={styles.title}>{title}</p>
                        <div className={styles.text}>
                            <div className={styles.categories}>
                                <p className={styles.category}>Жанр</p>
                                <p className={styles.category}>Год выпуска</p>
                                <p className={styles.category}>Описание</p>
                            </div>
                            <div className={styles.categories}>
                                <p>{genre}</p>
                                <p>{release_year}</p>
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <FilmRating id={id} />
        </div>
    );
};
