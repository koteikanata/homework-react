import { useEffect, useState } from 'react';
import classNames from 'classnames';
import StarFilled from '../../../public/star-filled.svg?react';
import StarOutline from '../../../public/star-outline.svg?react';
import { useDebounce } from '../../hooks';

import styles from './styles.module.css';

interface Props {
    rating?: number;
    onChange: (value: number) => void;
}

const Star = <StarOutline fill="#ABABAB" />;
const StarHovered = <StarFilled fill="#ABABAB" />;
const StarActive = <StarFilled fill="#FF5500" />;

export const Rating: React.FC<Props> = ({ onChange, rating = 0 }) => {
    const [innerRating, setInnerRating] = useState(rating);
    const [hoveredItem, setHoveredItem] = useState<number>();
    const debouncedRating = useDebounce(innerRating, 2000);

    const stars = [];

    useEffect(() => onChange(debouncedRating), [onChange, debouncedRating]);

    for (let i = 0; i < 5; i++) {
        let icon = Star;

        if (hoveredItem && i <= hoveredItem) {
            icon = StarHovered;
        } else if (innerRating && i < innerRating) {
            icon = StarActive;
        }

        stars.push(
            <label
                key={i + 1}
                className={classNames(styles.item)}
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(undefined)}
            >
                <input
                    className={classNames(styles.input)}
                    type="radio"
                    name="star"
                    value={i + 1}
                    onChange={() => setInnerRating(i + 1)}
                />
                <span className={styles.icon}>{icon}</span>
                <span className={classNames(styles.text)}>{i + 1}</span>
            </label>,
        );
    }

    return (
        <form
            className={classNames(styles.form, {
                [styles.form_completed]: rating,
            })}
        >
            <div className={styles.list}>{stars}</div>
        </form>
    );
};
