import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';
import NewsArticles from './components/Articles/News';
import videoArticle from './components/Articles/Videos';
import News from './components/News/news';
import Videos from './components/Videos/videos';
import SignIn from './components/Signin/signIn';
import { AuthContext, auth } from './app-firebase';
import SignOut from './components/SignOut/SignOut';
import Dashboard from './components/Dashboard/dashboard';
import PrivateRoute from './components/AuthGuards/privateRoutes';
import ProtectedRoute from './components/AuthGuards/protectedRoutes';
export default class Routes extends Component {
    state = { user: null }
    sub = null;
    componentWillMount() {
        this.sub = auth.onAuthStateChanged((user) => this.setState({ user }))
    }

    componentWillUnmount = () => {
      this.sub();
    }
    

    render() {
        const user = this.state.user;
        return (
            <BrowserRouter>
                <AuthContext.Provider value={{ user }}>
                    <Layout>
                        <Switch>
                            <Route path="/" exact={true} component={Home} />
                            <Route path="/news" exact={true} component={News} />
                            <Route path="/videos" exact={true} component={Videos} />
                            <PrivateRoute path="/dashboard" exact={true} component={Dashboard} />
                            <ProtectedRoute path="/sign-in" exact={true} component={SignIn} />
                            <Route path="/sign-out" exact={true} component={SignOut} />
                            <Route path="/articles/:id" exact={true} component={NewsArticles} />
                            <Route path="/videos/:id" exact={true} component={videoArticle} />
                        </Switch>

                    </Layout>
                </AuthContext.Provider>
            </BrowserRouter>
        )
    }




}

