import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Film } from '../../types';

interface GetFilmsParams {
    title?: Film['title'];
    genre?: Film['genre'];
    year?: Film['release_year'];
    page: number;
}

interface GetFilmsResponse {
    search_result: Film[];
    total_pages: number;
}

interface GetFilmParams {
    id?: Film['id'];
}

interface LoginParams {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

interface SendRatingParams {
    id: Film['id'];
    rating: number;
    token: string;
}

export const filmsApi = createApi({
    reducerPath: 'filmsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1' }),
    endpoints: (builder) => ({
        getFilms: builder.query<GetFilmsResponse, GetFilmsParams>({
            query: ({ title, page = 1, genre, year }) => {
                let url = `/search?page=${page}`;

                if (title) {
                    url += `&title=${encodeURIComponent(title)}`;
                }

                if (genre) {
                    url += `&genre=${encodeURIComponent(genre)}`;
                }

                if (year) {
                    url += `&release_year=${encodeURIComponent(year)}`;
                }

                return url;
            },
        }),
        getFilm: builder.query<Film, GetFilmParams>({
            query: ({ id }) => `/movie/${id}`,
        }),
        sendRating: builder.mutation<Record<string, string>, SendRatingParams>({
            query: ({ id, rating, token }) => ({
                url: '/rateMovie',
                method: 'POST',
                body: { movieId: id, user_rate: rating },
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
        }),
        login: builder.mutation<LoginResponse, LoginParams>({
            query: ({ username, password }) => ({
                url: '/login',
                method: 'POST',
                body: { username, password },
            }),
        }),
    }),
});

export const { useGetFilmsQuery, useGetFilmQuery, useSendRatingMutation, useLoginMutation } = filmsApi;
