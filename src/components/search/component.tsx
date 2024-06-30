import { useEffect, useState } from 'react';

import styles from './styles.module.css';
import { useDebounce } from '../../hooks';

import ClearSearch from '../../assets/clear-search.svg?react';

interface SearchProps {
    onChange: (query: string) => void;
    debounceDelay?: number;
}

const clearSearchIcon = <ClearSearch />;

export const Search: React.FC<SearchProps> = ({ onChange, debounceDelay = 300 }) => {
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
                    <div className={styles.clear} onClick={handleClearSearch}>
                        {clearSearchIcon}
                    </div>
                )}
            </div>
        </div>
    );
};
