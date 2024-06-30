import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';
import { useDebounce } from '../../hooks';

interface SearchProps {
    onChange: (query: string) => void;
    debounceDelay?: number;
}

export const Search: React.FC<SearchProps> = ({
    onChange,
    debounceDelay = 300,
}) => {
    const [query, setQuery] = useState('');
    const value = useDebounce(query, debounceDelay);

    useEffect(() => onChange(value), [onChange, value]);

    const handleClearSearch = () => {
        setQuery('');
    };

    return (
        <div className={styles.container}>
            <div className={styles['input-container']}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Название фильма"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                    <img
                        src="../../../public/clear-search.svg"
                        alt="Очистить"
                        className={styles.clear}
                        onClick={handleClearSearch}
                    />
                )}
            </div>
        </div>
    );
};
