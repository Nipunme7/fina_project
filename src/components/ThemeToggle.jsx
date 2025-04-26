import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/ThemeToggle.css';

function ThemeToggle() {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
        >
            {isDarkTheme ? '☀️' : '🌙'}
        </button>
    );
}

export default ThemeToggle; 