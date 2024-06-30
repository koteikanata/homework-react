import { useCallback } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Rating } from '../rating/component';
import type { Film } from '../../types';

import styles from './styles.module.css';

interface Props extends Film {
    href: string;
    onUserRatingChange: (id: Film['id'], rating: number) => void;
    userRating?: number;
}

export const FilmCard: React.FC<Props> = ({
    id,
    title,
    description,
    poster,
    genre,
    release_year,
    href,
    userRating,
    onUserRatingChange,
}) => {
    const onUserRatingChangeCallback = useCallback(
        (rating: number) => {
            onUserRatingChange(id, rating);
        },
        [onUserRatingChange, id],
    );

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
            <Rating rating={userRating} onChange={onUserRatingChangeCallback} />
        </div>
    );
};
