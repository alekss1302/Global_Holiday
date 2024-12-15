import React, { useEffect, useState } from 'react';
import './App.css';
import HolidayList from './components/HolidayList';
import Footer from './components/Footer';
import { useTranslation } from 'react-i18next';

const App = () => {
    const { i18n } = useTranslation();
    const [darkMode, setDarkMode] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [todayHolidays, setTodayHolidays] = useState([]);
    const [upcomingHolidays, setUpcomingHolidays] = useState([]);
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        fetch('https://date.nager.at/Api/v2/NextPublicHolidaysWorldwide')
            .then(response => response.json())
            .then(data => {
                const today = new Date().toISOString().split('T')[0];
                setTodayHolidays(data.filter(holiday => holiday.date === today));
                setUpcomingHolidays(data.filter(holiday => holiday.date > today));
            });
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
    };

    return (
        <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
            <header className="App-header">
                <h1>Holiday Tracker</h1>
                <div className="global-time">
                    <p>Current Time: {currentTime.toLocaleTimeString()}</p>
                    <p>Current Date: {currentTime.toLocaleDateString()}</p>
                </div>
                <button onClick={() => setDarkMode(!darkMode)}>
                    Toggle {darkMode ? 'Light' : 'Dark'} Mode
                </button>
                <select onChange={(e) => changeLanguage(e.target.value)} value={language}>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                </select>
            </header>
            <main>
                <HolidayList todayHolidays={todayHolidays} upcomingHolidays={upcomingHolidays} />
            </main>
            <Footer />
        </div>
    );
};

export default App;
