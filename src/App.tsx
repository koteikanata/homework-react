import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './components/layout/component';
import MainPage from './pages/main/MainPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import MoviePage from './pages/movie/MoviePage';

export const buildPageUrl = (page?: number) =>
    `/${page === undefined || page < 2 ? '' : page}`;

export const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <MainPage />
                        </Layout>
                    }
                />
                <Route
                    path="/:page"
                    element={
                        <Layout>
                            <MainPage />
                        </Layout>
                    }
                />
                <Route
                    path="/movie"
                    element={
                        <Layout>
                            <MoviePage />
                        </Layout>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Layout>
                            <NotFoundPage />
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
};
