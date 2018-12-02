import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';
import NewsArticles from './components/Articles/News';
import videoArticle from './components/Articles/Videos';
import News from './components/News/news';
import Videos from './components/Videos/videos';

export default class Routes extends Component {





    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/" exact={true} component={Home} />
                        <Route path="/news" exact={true} component={News} />
                        <Route path="/videos" exact={true} component={Videos} />
                        <Route path="/articles/:id" exact={true} component={NewsArticles} />
                        <Route path="/videos/:id" exact={true} component={videoArticle} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        )
    }




}

