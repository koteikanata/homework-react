import { Header } from '../header/component';
import classNames from 'classnames';

import styles from './styles.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className={classNames(styles.main)}>{children}</main>
        </div>
    );
};
