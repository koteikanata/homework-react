import { FilmCard } from '../film-card/component';
import type { Film } from '../../types';

import styles from './styles.module.css';
import { useLocalStorage } from '../../hooks';
import { useCallback } from 'react';

interface FilmsProps {
    items: Film[];
}

export const FilmsList: React.FC<FilmsProps> = ({ items }) => {
    const [ratingsHash, setRatingsHash] = useLocalStorage<
        Record<Film['id'], number>
    >('films-rating', {});

    const onUserRatingChange = useCallback((id: Film['id'], rating: number) => {
        setRatingsHash(prevRatingHash => ({
            ...prevRatingHash,
            [id]: rating,
        }));
    }, [setRatingsHash]);

    return (
        <>
            {items.length ? (
                <div className={styles.list}>
                    {items.map((film) => {
                        const cardRating = ratingsHash[film.id] ?? 0;

                        return (
                            <div key={film.id} className={styles.item}>
                                <FilmCard
                                    {...film}
                                    href={`/movie?id=${film.id}`}
                                    userRating={cardRating}
                                    onUserRatingChange={onUserRatingChange}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.container}>
                    <p className={styles.header}>Фильмы не найдены</p>
                    <p className={styles.text}>
                        Измените запрос и попробуйте снова
                    </p>
                </div>
            )}
        </>
    );
};
