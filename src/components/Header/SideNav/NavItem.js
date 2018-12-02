import React from 'react';
import FontAwesome from 'react-fontawesome'
import styles from './sideNav.module.css';
import { Link } from 'react-router-dom';



const NavItem = (props) => {
    return (
        <div className={props.type}>
            <Link to={props.to} onClick={props.hideNav} className={styles.Link}>
                <FontAwesome name={props.icon} />
                {props.children}
            </Link>
        </div>
    );
}

export default NavItem;
