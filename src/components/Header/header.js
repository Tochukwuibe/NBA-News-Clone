import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import SideNav from './SideNav/sideNav';

const Logo = () => (
    <Link to="/" className={styles.Logo} >
        <img src="/assets/images/nba_logo.png" alt="logo" />
    </Link>
);



const Menu = ({ openNav }) => (
    <div className={styles.Bars} onClick={openNav}>
        <FontAwesome name="bars" style={{ color: '#dfdfdf', padding: '10px', fontSize: '25px' }} />
    </div>
);




const Header = (props) => {
    return (
        <header className={styles.Header}>
            <SideNav {...props} />
            <div className={styles.Content}>
                <Menu openNav={props.onOpenNav} />
                <Logo />
            </div>
        </header>
    );
}

export default Header;
