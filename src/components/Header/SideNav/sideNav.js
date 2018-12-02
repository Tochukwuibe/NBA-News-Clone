import React from 'react';
import SideNav from 'react-simple-sidenav';
import NavItem from './NavItem';
import styles from './sideNav.module.css';

const Items = [
    { icon: 'home', to: '/', content: 'Home', type: styles.Option },
    { icon: 'file-text-o', to: '/news', content: 'News', type: styles.Option },
    { icon: 'play', to: '/videos', content: 'Videos', type: styles.Option },
    { icon: 'sign-in', to: '/sign-in', content: 'Sign In', type: styles.Option },
    { icon: 'sign-out', to: '/sign-out', content: 'Sign Out', type: styles.Option }
];


const renderItems = (hideNav) => {
    return Items.map((item, index) => <NavItem key={index} hideNav={hideNav} to={item.to} icon={item.icon} type={item.type} > {item.content} </NavItem>)
}



const SideNavigation = (props) => {
    return (
        <div>
            <SideNav
                showNav={props.showNav}
                onHideNav={props.onHideNav}
                navStyle={{
                    background: '#242424',
                    maxWidth: '220px'
                }}
            >
                {renderItems(props.onHideNav)}
            </SideNav>
        </div>
    );
}

export default SideNavigation;
