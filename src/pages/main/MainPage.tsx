import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buildPageUrl } from '../../App';
import { Search } from '../../components/search/component';
import { type BaseSelectItem, Select } from '../../components/select/component';
import { FilmsList } from '../../components/films/component';
import { Pagination } from '../../components/pagination/component';
import { useGetFilmsQuery } from '../../features/api/filmsApi';
import { useQuery } from '../../hooks';
import {
    addQueryParams,
    resetPathname,
    transformConstantsToArray,
    transformConstantsToHash,
} from '../../utils';
import { GENRES as GENRES_DATA, YEARS as YEARS_DATA } from '../../constants';

import styles from './styles.module.css';
import { Loader } from '../../components/loader/component';
import NotFoundPage from '../not-found/NotFoundPage';

const GENRES_ARRAY = transformConstantsToArray(GENRES_DATA);
const YEARS_ARRAY = transformConstantsToArray(YEARS_DATA);

const GENRES_HASH = transformConstantsToHash(GENRES_DATA);
const YEARS_HASH = transformConstantsToHash(YEARS_DATA);

const MainPage: React.FC = () => {
    const { page: pageFromParam } = useParams<string>();
    const page = Number(pageFromParam) || 1;

    const genreQuery = useQuery('genre');
    const yearQuery = useQuery('year');

    const navigate = useNavigate();

    const genre = genreQuery ? GENRES_HASH[genreQuery] : undefined;
    const year = yearQuery ? YEARS_HASH[yearQuery] : undefined;

    const [searchQuery, setSearchQuery] = useState('');

    const resetPageNumber = useCallback(() => {
        navigate(resetPathname(window.location.href));
    }, [navigate]);

    const onSearchQueryChange = useCallback(
        (query: string) => {
            resetPageNumber();
            setSearchQuery(query);
        },
        [resetPageNumber, setSearchQuery],
    );

    const onGenreChange = useCallback(
        (genre: BaseSelectItem) => {
            const id = !genre.default ? genre.id : undefined;

            navigate(addQueryParams(document.location.href, { genre: id }));
        },
        [navigate],
    );

    const onYearChange = useCallback(
        (year: BaseSelectItem) => {
            const id = !year.default ? year.id : undefined;

            navigate(addQueryParams(document.location.href, { year: id }));
        },
        [navigate],
    );

    const { data, error, isLoading } = useGetFilmsQuery(
        { page, title: searchQuery, genre: genre?.id, year: year?.id },
        { refetchOnMountOrArgChange: true },
    );

    let Films: React.ReactElement | null = null;

    if (isLoading) {
        Films = (
            <div>
                <Loader />
            </div>
        );
    } else if (error) {
        Films = (
            <div>
                <NotFoundPage />
            </div>
        );
    } else if (data) {
        Films = (
            <>
                <FilmsList items={data.search_result}></FilmsList>
                <Pagination
                    page={page}
                    prevLink={page > 1 ? buildPageUrl(page - 1) : undefined}
                    nextLink={
                        page < data.total_pages
                            ? buildPageUrl(page + 1)
                            : undefined
                    }
                />
            </>
        );
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    return (
            <div className={styles.container}>
                <div className={styles.filters}>
                    <div className={styles['filters-title']}>Фильтр</div>
                    <div className={styles.filter}>
                        <div className={styles['filter-title']}>Жанр</div>
                        <Select
                            items={GENRES_ARRAY}
                            activeItem={genre}
                            placeholder="Выберите жанр"
                            onChange={onGenreChange}
                        />
                    </div>
                    <div className={styles.filter}>
                        <div className={styles['filter-title']}>
                            Год выпуска
                        </div>
                        <Select
                            items={YEARS_ARRAY}
                            activeItem={year}
                            placeholder="Выберите Год"
                            onChange={onYearChange}
                        />
                    </div>
                </div>
                <div className={styles['films-container']}>
                    <Search onChange={onSearchQueryChange} />
                    {Films}
                </div>
            </div>
    );
};

export default MainPage;
