import { FilmCard } from '../film-card/component';
import { useGetFilmsQuery } from '../../features/api/filmsApi';
import { buildPageUrl } from '../../App';

import styles from './styles.module.css';
import { Loader } from '../loader/component';
import { NotFoundPage } from '../../pages/not-found/NotFoundPage';
import { Pagination } from '../pagination/component';

interface FilmsProps {
    page: number;
    searchQuery?: string;
    genre?: string;
    year?: string;
}

export const FilmsList: React.FC<FilmsProps> = ({ page, genre, year, searchQuery }) => {
    const { data, error, isLoading } = useGetFilmsQuery(
        { page, title: searchQuery, genre: genre, year: year },
        { refetchOnMountOrArgChange: true },
    );

    if (isLoading) {
        return <Loader />;
    } else if (error || !data) {
        return <NotFoundPage />;
    }

    const items = data.search_result;

    return (
        <>
            {items.length ? (
                <>
                    <div className={styles.list}>
                        {items.map((film) => {
                            return (
                                <div key={film.id} className={styles.item}>
                                    <FilmCard {...film} href={`/movie?id=${film.id}`} />
                                </div>
                            );
                        })}
                    </div>
                    <Pagination
                        page={page}
                        prevLink={page > 1 ? buildPageUrl(page - 1) : undefined}
                        nextLink={page < data.total_pages ? buildPageUrl(page + 1) : undefined}
                    />
                </>
            ) : (
                <div className={styles.container}>
                    <p className={styles.header}>Фильмы не найдены</p>
                    <p className={styles.text}>Измените запрос и попробуйте снова</p>
                </div>
            )}
        </>
    );
};
