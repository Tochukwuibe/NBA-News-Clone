import React, { Component } from 'react'
import axios from 'axios'
import { API_ENDPOINT } from '../../../config';
import SliderTemplates from './slider_template';


export default class Slider extends Component {


    state = {
        news: []
    }


    componentWillMount = () => this.fetchArticles();
    render = () => this.renderView();


    fetchArticles = async () => {
        const { data } = await axios.get(`${API_ENDPOINT}/articles?_start=${this.props.start}&_end=${this.props.start + this.props.amount}`)
        this.setState({ news: data })
    }

    renderView() {
        return (
            <div>
                <SliderTemplates data={this.state.news} settings={this.props.settings} type={this.props.type} />
            </div>

        );
    }
}
