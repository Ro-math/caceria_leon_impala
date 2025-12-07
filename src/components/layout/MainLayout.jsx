import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({ children, title = 'Dashboard' }) => {
    return (
        <div className="main-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <main className="content-area">
                    {children}
                </main>
               
            </div>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: 'var(--bg-card)',
                        color: 'var(--text-main)',
                    },
                }}
            />
        </div>
    );
};

export default MainLayout;
