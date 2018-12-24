import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './newsList.module.css'
import Button from '../Button/button';
import NewsListItem from './newsListItem';
import { db } from '../../../app-firebase';


export default class NewsList extends Component {

    state = {
        news: [],
        teams: [],
        start: 0,
        stop: 0,
        done: false
    };




    componentWillMount = async () => {
        this.fetchNews(this.props.start, this.props.amount);
    }
    render = () => this.renderView();
    onLoadMore = async () => {
        await this.fetchNews(this.state.start + this.state.stop, this.state.stop);
    };



    renderView = () => {
        let view = (<p>Loading...</p>)

        if (this.state.news.length && this.state.teams.length) {
            view = (
                <div>
                    {this.renderTransitions()}
                    {
                        this.props.loadMore && !this.state.done ? <Button
                            clicked={this.onLoadMore}
                            type="loadmore"
                        >
                            Load More
                </Button> : null
                    }
                </div>

            )
        }

        return view;
    }

    renderTransitions = () => (
        <TransitionGroup
            component='div'
            className="list"
        >
            {this.renderNews()}
        </TransitionGroup>
    );



    fetchNews = async (start, stop) => {
        const snap = await db.ref('articles').orderByChild('id').startAt(start).limitToFirst(stop).once('value');
        const news = !!snap.val() ? Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], key })) : [];
        const teams = await this.fetchTeams(news)
        console.log('the start and stop ', start, stop);
        this.setState((state) => ({ news: state.news.concat(news), teams: state.teams.concat(teams), start, stop, done: !(!!news.length) }));
    }

    fetchTeams = async (news) => {
        return await Promise.all(
            news.map(async (article) => {
                const snap = await db.ref('teams').orderByChild('id').equalTo(+article.team).limitToFirst(1).once('value');
                return Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], key }))[0];
            }))

    }



    renderNews() {

        return this.state.news.map((art, index) => (
            <CSSTransition
                key={index}
                classNames={{
                    enter: styles.NewsListWrapper,
                    enterActive: styles.NewsListWrapperEnter
                }}
                timeout={700}
            >
                <NewsListItem art={art} type={this.props.type} team={this.state.teams.find((team) => team.id === art.team)} />
            </CSSTransition>
        ));

    }
}
