import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home/home';

export default class Routes extends Component {


    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true}  component={Home}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

