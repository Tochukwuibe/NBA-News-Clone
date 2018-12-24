import React, { Component } from 'react'
import SliderTemplates from './slider_template';
import { db } from '../../../app-firebase';


export default class Slider extends Component {


    state = {
        news: []
    }


    componentWillMount = () => this.fetchArticles();
    render = () => this.renderView();


    fetchArticles = async () => {
        const snap = await db.ref('articles').orderByChild('id').startAt(0).limitToFirst(5).once('value');
        const news = !!snap.val() ? Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], key })) : [];
        this.setState({ news })
    }

    renderView() {
        return (
            <div>
                {!!this.state.news.length ? <SliderTemplates data={this.state.news} settings={this.props.settings} type={this.props.type} /> : <p>Loading....</p> }
            </div>

        );
    }
}
