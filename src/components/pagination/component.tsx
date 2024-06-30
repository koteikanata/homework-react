import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import classNames from 'classnames';

interface Props {
    page: number;
    prevLink?: string;
    nextLink?: string;
}

export const Pagination: React.FC<Props> = ({ page, prevLink, nextLink }) => {
    return (
        <footer className={styles.footer}>
            {prevLink ? (
                <Link
                    to={prevLink}
                    className={classNames(styles.button, styles.button_rotated)}
                />
            ) : (
                <button
                    className={classNames(styles.button, styles.button_rotated)}
                    disabled={true}
                />
            )}
            <span>{page}</span>
            {nextLink ? (
                <Link className={styles.button} to={nextLink} />
            ) : (
                <button className={styles.button} disabled={true} />
            )}
        </footer>
    );
};
