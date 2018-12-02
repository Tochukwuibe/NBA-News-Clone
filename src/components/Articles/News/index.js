import React, { Component } from 'react';
import axios from 'axios';
import styles from '../articles.module.css'
import { API_ENDPOINT } from '../../../config';
import ArticleHeader from './Post/header';


export default class NewsArticles extends Component {


    state = {
        article: null,
        team: null
    }


    componentWillMount = async () => {

        await this.fetchArticle();
        await this.fetchTeam();

    }


    render = () => this.renderView();

    renderView() {
        let view = <p>Loading...</p>;

        if (this.state.team && this.state.article) {
            view = (
                <div className={styles.Article}>
                    <ArticleHeader team={this.state.team} date={this.state.article.date} author={this.state.article.author} />
                    {this.renderBody()}
                </div>
            );
        }
        return view;
    }

    renderBody = () => (
        <div className={styles.ArticleBody}>
            <h1>{this.state.article.title}</h1>
            <div
                className={styles.ArticleImg}
                style={{ background: `url(/assets/images/articles/${this.state.article.image})` }}>
            </div>

            <div className={styles.ArticleText}>
                    {this.state.article.body}
            </div>
        </div>
    );


    fetchTeam = async () => {

        const { data } = await axios.get(`${API_ENDPOINT}/teams?id=${this.state.article.team}`);
        this.setState({ team: data[0] });
    }

    fetchArticle = async () => {
        const articleId = this.props.match.params.id;
        const { data } = await axios.get(`${API_ENDPOINT}/articles/${articleId}`);
        this.setState((state) => {
            return { article: data }
        })
    }
}
