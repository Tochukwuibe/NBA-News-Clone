import React, { Component } from 'react';
import styles from '../articles.module.css'
import ArticleHeader from './Post/header';
import { db } from '../../../app-firebase';


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
                style={{ background: `url(${this.state.article.image})` }}>
            </div>

            <div className={styles.ArticleText}
            dangerouslySetInnerHTML={{
                __html: this.state.article.body
            }}
            >
            </div>
        </div>
    );


    fetchTeam = async () => {
        const snap = await db.ref(`teams`).orderByChild('id').equalTo(this.state.article.team).once('value')
        const team = Object.keys(snap.val()).map((key) => ({...snap.val()[key], key }))[0];
        this.setState({ team });
    }

    fetchArticle = async () => {
        const articleId = this.props.match.params.id;
        const snap = await db.ref(`articles`).orderByChild('id').equalTo(+articleId).once('value')
        const article = Object.keys(snap.val()).map((key) => ({...snap.val()[key], key }))[0];
        this.setState({ article })
    }
}
