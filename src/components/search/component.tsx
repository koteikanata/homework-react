import { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';
import { useDebounce } from '../../hooks';

interface SearchProps {
    onChange: (query: string) => void;
    debounceDelay?: number;
}

export const Search: React.FC<SearchProps> = ({ onChange, debounceDelay = 300 }) => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, debounceDelay);

    useEffect(() => onChange(debouncedQuery), [onChange, debouncedQuery]);

    const handleClearSearch = () => {
        setQuery('');
    };

    return (
        <div className={styles.container}>
            <div className={classNames(styles['input-container'])}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Название фильма"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                    <img
                        src="./src/assets/clear-search.svg"
                        alt="Очистить"
                        className={styles.clear}
                        onClick={handleClearSearch}
                    />
                )}
            </div>
        </div>
    );
};
