import { Header } from '../header/component';

import styles from './styles.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className={styles.main}>{children}</main>
        </div>
    );
};
