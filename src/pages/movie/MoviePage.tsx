import { useSearchParams } from 'react-router-dom';
import { useGetFilmQuery } from '../../features/api/filmsApi';
import type { Film } from '../../types';
import { Rating } from '../../components/rating/component';
import classNames from 'classnames';
import { Loader } from '../../components/loader/component';
import NotFoundPage from '../not-found/NotFoundPage';
import { Actors } from '../../components/slider/component';
import { useLocalStorage } from '../../hooks';

import styles from './styles.module.css';

const MoviePage: React.FC = () => {
    const [ratingsHash, setRatingsHash] = useLocalStorage<Record<Film['id'], number>>('films-rating', {});
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    if (!id) return <NotFoundPage />;

    const { data: film, error, isLoading } = useGetFilmQuery({ id });

    if (isLoading) return <Loader />;
    if (!film || error) return <NotFoundPage />;

    const rating = ratingsHash[film.id];

    return (
        <>
            <div className={styles['film-card']}>
                <div className={styles.body}>
                    <img src={film.poster} alt={film.title} className={styles.image} />
                    <div className={styles['text-content']}>
                        <h1 className={classNames(styles.title, styles['bold-text'])}>{film.title}</h1>
                        <p className={styles.text}>
                            <b>Жанр: </b>
                            {film.genre}
                        </p>
                        <p className={styles.text}>
                            <b>Год выпуска: </b>
                            {film.release_year}
                        </p>
                        <p className={styles.text}>
                            <b>Рейтинг: </b>
                            {film.rating}
                        </p>
                        <p className={classNames(styles.text, styles['bold-text'])}>Описание</p>
                        <p className={styles.text}>{film.description}</p>
                    </div>
                </div>
                <Rating rating={rating} onChange={(v) => console.log(v)} />
            </div>
            <Actors actors={film.actors} />
        </>
    );
};

export MoviePage;
