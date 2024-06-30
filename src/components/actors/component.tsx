import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

interface Props {
    actors: { name: string; photo: string }[];
}

export const Actors: React.FC<Props> = ({ actors }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);

    const handleClick = (scrollOffset: number) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: scrollOffset,
                behavior: 'smooth',
            });
        }
    };

    const checkScrollPosition = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                containerRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft + clientWidth < scrollWidth);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const handleScroll = () => checkScrollPosition();
        const container = containerRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <h2 className={styles['actor-header']}>Актёры</h2>
            <div className={styles['actor-slider']}>
                {showLeftButton && (
                    <button
                        className={classNames(styles.button, styles.left)}
                        onClick={() => handleClick(-300)}
                    />
                )}
                <div className={styles['actor-container']} ref={containerRef}>
                    {actors.map(({ name, photo }, i) => (
                        <div
                            key={`${name}-${i}`}
                            className={styles['actor-card']}
                        >
                            <img
                                src={photo}
                                width={160}
                                className={styles['actor-image']}
                            />
                            <p>{name}</p>
                        </div>
                    ))}
                </div>
                {showRightButton && (
                    <button
                        className={classNames(styles.button, styles.right)}
                        onClick={() => handleClick(300)}
                    />
                )}
            </div>
        </>
    );
};
