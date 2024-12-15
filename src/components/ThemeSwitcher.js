import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitcher = ({ isDarkMode, toggleTheme }) => {
    return (
        <button onClick={toggleTheme} className="theme-switcher">
            {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
            {isDarkMode ? ' Switch to Light Mode' : ' Switch to Dark Mode'}
        </button>
    );
};

export default ThemeSwitcher;
