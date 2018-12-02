import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'axios'
import { API_ENDPOINT } from '../../../config';
import styles from './newsList.module.css'
import Button from '../Button/button';
import NewsListItem from './newsListItem';


export default class NewsList extends Component {

    state = {
        news: [],
        teams: [],
        start: 0,
        end: 0
    };




    componentWillMount = async () => {
        await this.fetchTeams();
        this.fetchNews(this.props.start, this.props.start + this.props.amount);
    }
    render = () => this.renderView();
    onLoadMore = () => this.fetchNews(this.state.end, this.state.end + this.props.amount);



    renderView = () => (
        <div>
            {this.renderTransitions()}
            {
                this.props.loadMore ? <Button
                    clicked={this.onLoadMore}
                    type="loadmore"
                >
                    Load More
            </Button> : null
            }
        </div>

    )

    renderTransitions = () => (
        <TransitionGroup
            component='div'
            className="list"
        >
            {this.renderNews()}
        </TransitionGroup>
    );



    fetchNews = async (start, stop) => {
        const { data } = await axios.get(`${API_ENDPOINT}/articles?_start=${start}&_end=${stop}`)
        this.setState((state) => {
            return { news: state.news.concat(data), start, stop }
        });
    }

    fetchTeams = async () => {
        const { data } = await axios.get(`${API_ENDPOINT}/teams?`);
        this.setState({ teams: data });
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
