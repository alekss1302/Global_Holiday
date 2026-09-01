import React, { useEffect, useState } from 'react';
import './App.css';
import HolidayList from './components/HolidayList';
import Footer from './components/Footer';
import { useTranslation } from 'react-i18next';

const App = () => {
    const { t, i18n } = useTranslation();

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('holidayFinderTheme') === 'dark';
    });

    const [currentTime, setCurrentTime] = useState(new Date());

    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('holidayFinderLanguage') || 'en';
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
        localStorage.setItem('holidayFinderTheme', darkMode ? 'dark' : 'light');

        return () => {
            document.body.classList.remove('dark-mode');
        };
    }, [darkMode]);

    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem('holidayFinderLanguage', language);
    }, [i18n, language]);

    return (
        <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
            <header className="App-header">
                <div className="header-inner">
                    <div className="brand-block">
                        <span className="eyebrow">{t('eyebrow')}</span>
                        <h1>{t('appTitle')}</h1>
                        <p className="subtitle">{t('appSubtitle')}</p>
                    </div>

                    <div className="header-status" aria-label={t('currentDateTime')}>
                        <span>
                            <strong>{t('currentTime')}:</strong>{' '}
                            {currentTime.toLocaleTimeString()}
                        </span>
                        <span>
                            <strong>{t('currentDate')}:</strong>{' '}
                            {currentTime.toLocaleDateString()}
                        </span>
                    </div>

                    <div className="header-actions">
                        <button
                            className="secondary-button"
                            onClick={() => setDarkMode(previous => !previous)}
                            type="button"
                        >
                            {darkMode ? t('switchLight') : t('switchDark')}
                        </button>

                        <label className="language-control">
                            <span>{t('language')}</span>
                            <select
                                aria-label={t('language')}
                                onChange={(event) => setLanguage(event.target.value)}
                                value={language}
                            >
                                <option value="en">English</option>
                                <option value="es">Español</option>
                            </select>
                        </label>
                    </div>
                </div>
            </header>

            <main>
                <HolidayList />
            </main>

            <Footer />
        </div>
    );
};

export default App;
