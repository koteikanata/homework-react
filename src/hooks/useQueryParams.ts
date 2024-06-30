import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useQuery = (key: string) => {
    const { search } = useLocation();

    return useMemo(() => {
        const parsed = new URLSearchParams(search);

        return parsed.get(key);
    }, [key, search]);
};
