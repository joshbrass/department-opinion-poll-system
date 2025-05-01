import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { IoIosMoon, IoMdSunny } from 'react-icons/io';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import logo from '../../assets/images/poll-logo.jpg';
const THEME_KEY = 'opinion-poll-system';
const Navbar = () => {
    const [showNav, setShowNav] = useState(window.innerWidth < 600 ? false : true);
    const [darkTheme, setDarkTheme] = useState(localStorage.getItem(THEME_KEY) || '');
    // Function to close nav menu on smaller screens
    const closeNavMenu = () => {
        if (window.innerWidth < 600) {
            setShowNav(false);
        }
        else {
            setShowNav(true);
        }
    };
    // Toggle dark/light theme
    const changeThemeHandler = () => {
        const currentTheme = localStorage.getItem(THEME_KEY);
        const newTheme = currentTheme === 'dark' ? '' : 'dark';
        localStorage.setItem(THEME_KEY, newTheme);
        setDarkTheme(newTheme);
    };
    // Apply theme to body
    useEffect(() => {
        document.body.className = localStorage.getItem(THEME_KEY) || '';
    }, [darkTheme]);
    return (_jsx("nav", { children: _jsxs("div", { className: `container ${styles.nav_container}`, children: [_jsxs(Link, { to: '/', className: styles.nav_logo, children: [_jsx("img", { src: logo, className: styles.logo_img, alt: "" }), " "] }), _jsxs("div", { children: [showNav && (_jsxs("menu", { children: [_jsx(NavLink, { to: '/polls', onClick: closeNavMenu, children: "Admin" }), _jsx(NavLink, { to: '/poll-list', onClick: closeNavMenu, children: "Polls" }), _jsx(NavLink, { to: '/results', onClick: closeNavMenu, children: "Results" }), _jsx(NavLink, { to: '/logout', onClick: closeNavMenu, children: "Log out" })] })), _jsx("button", { className: styles.theme_toggle_btn, onClick: changeThemeHandler, children: darkTheme ? _jsx(IoMdSunny, {}) : _jsx(IoIosMoon, {}) }), _jsx("button", { className: styles.nav_toggle_btn, onClick: () => setShowNav(!showNav), children: showNav ? _jsx(AiOutlineClose, {}) : _jsx(HiOutlineBars3, {}) })] })] }) }));
};
export default Navbar;
