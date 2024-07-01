import { useState } from 'react';
import classNames from 'classnames';
import StarFilled from '../../assets/star-filled.svg?react';
import StarOutline from '../../assets/star-outline.svg?react';

import styles from './styles.module.css';
import useDebouncedCallback from '../../hooks/useDebouncedCallback';

interface Props {
    rating?: number;
    readonly?: boolean;
    onChange: (value: number) => void;
    onNonAuthRatingChange?: () => void;
}

const Star = <StarOutline fill="#ABABAB" />;
const StarHovered = <StarFilled fill="#ABABAB" />;
const StarActive = <StarFilled fill="#FF5500" />;

export const Rating: React.FC<Props> = ({ onChange, readonly, onNonAuthRatingChange, rating = 0 }) => {
    const [innerRating, setInnerRating] = useState(rating);
    const [hoveredItem, setHoveredItem] = useState<number>();

    const stars = [];

    const debouncedCallback = useDebouncedCallback((rating: number) => onChange(rating), 500);

    const onTryToChangeRating = (rating: number) => {
        if (readonly) {
            onNonAuthRatingChange && onNonAuthRatingChange();
        } else {
            setInnerRating(rating);
            debouncedCallback(rating);
        }
    };

    for (let i = 0; i < 5; i++) {
        let icon = Star;

        if (hoveredItem !== undefined) {
            if (i <= hoveredItem) {
                icon = StarHovered;
            }
        } else if (innerRating && i < innerRating) {
            icon = StarActive;
        }

        stars.push(
            <label
                key={i + 1}
                className={styles.item}
                onMouseEnter={() => !readonly && setHoveredItem(i)}
                onMouseLeave={() => !readonly && setHoveredItem(undefined)}
            >
                <input
                    className={styles.input}
                    type="radio"
                    name="star"
                    value={i + 1}
                    onChange={() => onTryToChangeRating(i + 1)}
                />
                <span className={styles.icon}>{icon}</span>
                <span className={styles.text}>{i + 1}</span>
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
