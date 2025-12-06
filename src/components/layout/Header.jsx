import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Layout.css';
import Button from '../common/Button';

const Header = ({ title }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="header">
            <div className="header-title">{title}</div>
            <div className="header-actions">
                <Button variant="secondary" onClick={toggleTheme} className="theme-toggle">
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </Button>
            </div>
        </header>
    );
};

export default Header;
