import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { IoIosMoon, IoMdSunny } from 'react-icons/io';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import logo from '../../assets/images/poll-logo.jpg'

const THEME_KEY = 'opinion-poll-system'; 

const Navbar = () => {
  const [showNav, setShowNav] = useState(window.innerWidth < 600 ? false : true);
  const [darkTheme, setDarkTheme] = useState<string>(localStorage.getItem(THEME_KEY) || '');

  // Function to close nav menu on smaller screens
  const closeNavMenu = () => {
    if (window.innerWidth < 600) {
      setShowNav(false);
    } else {
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

  return (
    <nav>
      <div className={`container ${styles.nav_container}`}>
        <Link to='/' className={styles.nav_logo}><img src={logo} className={styles.logo_img} alt="" /> </Link>

        <div>
          {showNav && (
            <menu>
              <NavLink to='/admin' onClick={closeNavMenu}>Admin</NavLink>
              <NavLink to='/poll-list' onClick={closeNavMenu}>Polls</NavLink>
              <NavLink to='/results' onClick={closeNavMenu}>Results</NavLink>
              <NavLink to='/logout' onClick={closeNavMenu}>Log out</NavLink>
            </menu>
          )}

          <button className={styles.theme_toggle_btn} onClick={changeThemeHandler}>{darkTheme ?  <IoMdSunny /> : <IoIosMoon/>}
           
          </button>

          <button className={styles.nav_toggle_btn} onClick={() => setShowNav(!showNav)}>
            {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
