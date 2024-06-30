import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { Film } from '../../types';
import { Auth } from '../auth/component';
import { Rating } from '../rating/component';
import { useSendRatingMutation } from '../../features/api/filmsApi';
import { useLocalStorage } from '../../hooks';
import type { RootState } from '../../store/store';

interface Props {
    id: Film['id'];
}

export const FilmRating: React.FC<Props> = ({ id }) => {
    const [authModalOpened, setAuthModalOpened] = useState<boolean>();
    const [sendRating] = useSendRatingMutation();
    const [ratingsHash, setRatingsHash] = useLocalStorage<Record<Film['id'], number>>('films-rating', {});
    const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [rating, setRating] = useState<number>();

    const onRatingChange = useCallback((rating: number) => setRating(rating), [setRating]);
    const onNonAuthRatingChange = useCallback(() => setAuthModalOpened(true), [setAuthModalOpened]);

    useEffect(() => {
        if (rating === undefined) {
            return;
        }

        // установить localstorage
        setRatingsHash((prevRatingHash) => ({
            ...prevRatingHash,
            [id]: rating,
        }));

        if (isAuthenticated && token) {
            // отправить запрос с новым значением
            sendRating({ id, rating, token });
        }
    }, [id, isAuthenticated, rating, sendRating, setRatingsHash, token]);

    return (
        <>
            <Rating
                rating={isAuthenticated ? ratingsHash[id] || rating : undefined}
                readonly={!isAuthenticated}
                onChange={onRatingChange}
                onNonAuthRatingChange={onNonAuthRatingChange}
            />
            {authModalOpened && <Auth onClose={() => setAuthModalOpened(false)} />}
        </>
    );
};
