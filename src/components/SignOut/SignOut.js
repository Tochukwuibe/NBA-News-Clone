import React, { Component } from 'react'
import { auth } from '../../app-firebase';
import { Redirect } from 'react-router-dom';

export default class SignOut extends Component {

    state = { loggedout: false }
    componentWillMount = async () => {
        await auth.signOut();
        this.setState({ loggedout: true })
    }



    render() {
        return (
            <div>
                {this.state.loggedout ? <Redirect to="/sign-in" /> : null}
            </div>
        )
    }
}
