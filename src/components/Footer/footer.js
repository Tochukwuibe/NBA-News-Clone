import React from 'react';
import styles from './footer.module.css';
import { Link } from 'react-router-dom';
import { CURRENT_YEAR } from '../../config';

const Footer = (props) => {
    return (
        <div className={styles.Footer}>
            <Link to="/" className={styles.Logo} >
                <img src="/assets/images/nba_logo.png" alt="logo" />
            </Link>

            <div className={styles.Right}> <p>@NBA {CURRENT_YEAR}</p> </div>
        </div>
    );
}

export default Footer;
