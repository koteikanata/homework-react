import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useGetFilmQuery } from '../../features/api/filmsApi';
import { Loader } from '../../components/loader/component';
import { NotFoundPage } from '../not-found/NotFoundPage';
import { FilmRating } from '../../components/film-rating/components';
import { Actors } from '../../components/slider/component';

import styles from './styles.module.css';

export const MoviePage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || undefined;

    const { data: film, error, isLoading } = useGetFilmQuery({ id }, { skip: id === undefined });

    if (isLoading) return <Loader />;
    if (!id || !film || error) return <NotFoundPage />;

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
                <FilmRating id={id} />
            </div>
            <Actors actors={film.actors} />
        </>
    );
};
