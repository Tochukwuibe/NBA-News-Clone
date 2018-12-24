import React from 'react';
import SideNav from 'react-simple-sidenav';
import NavItem from './NavItem';
import styles from './sideNav.module.css';
import { AuthContext } from '../../../app-firebase';


const isAuth = [
    { icon: 'home', to: '/', content: 'Home', type: styles.Option },
    { icon: 'file-text-o', to: '/news', content: 'News', type: styles.Option },
    { icon: 'play', to: '/videos', content: 'Videos', type: styles.Option },
    { icon: 'volume-up', to: '/dashboard', content: 'Dashboard', type: styles.Option },
    { icon: 'sign-out', to: '/sign-out', content: 'Sign Out', type: styles.Option },
   
];

const notAuth = [
    { icon: 'home', to: '/', content: 'Home', type: styles.Option },
    { icon: 'file-text-o', to: '/news', content: 'News', type: styles.Option },
    { icon: 'play', to: '/videos', content: 'Videos', type: styles.Option },
    { icon: 'sign-in', to: '/sign-in', content: 'Sign In', type: styles.Option },
];



const renderItems = (hideNav, user, history) => {
    const items = !!user ? isAuth : notAuth;
    return items.map((item, index) => <NavItem key={index} hideNav={hideNav} to={item.to} icon={item.icon} type={item.type} > {item.content} </NavItem>)
}



const SideNavigation = (props) => {
    console.log('the props ', props);
    return (
        <div>
            <AuthContext.Consumer>
                {({ user }) => <SideNav
                    showNav={props.showNav}
                    onHideNav={props.onHideNav}
                    navStyle={{
                        background: '#242424',
                        maxWidth: '220px'
                    }}
                >
                    {renderItems(props.onHideNav, user, props.history)}
                </SideNav>
                }

            </AuthContext.Consumer>

        </div>
    );
}

export default SideNavigation;
