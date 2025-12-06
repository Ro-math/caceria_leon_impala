import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaDumbbell, FaPaw, FaBrain, FaChartBar } from 'react-icons/fa';
import { GiLion } from 'react-icons/gi';
import './Layout.css';

const Sidebar = () => {
    const navItems = [
        { path: '/', label: 'Dashboard', icon: <FaHome /> },
        { path: '/training', label: 'Entrenamiento', icon: <FaDumbbell /> },
        { path: '/hunting', label: 'Cacería', icon: <FaPaw /> },
        { path: '/knowledge', label: 'Conocimiento', icon: <FaBrain /> },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <GiLion className="sidebar-logo" />
                <span className="sidebar-title">LeonAI</span>
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
