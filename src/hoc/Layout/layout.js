import React, { Component } from 'react'
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

export default class Layout extends Component {

    state = {
        showNav: false
    };


    toggleNav = (val) => {
        return () => this.setState({ showNav: val })
    }

    render = () => this.renderView();


    renderView() {
        return (<div>
            <Header
                onHideNav={this.toggleNav(false)}
                onOpenNav={this.toggleNav(true)}
                showNav={this.state.showNav}
            />
            {this.props.children}
            <Footer />
        </div>);
    }
}

