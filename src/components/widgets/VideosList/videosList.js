import React, { Component } from 'react'
import styles from './videosList.module.css'
import axios from 'axios';
import Button from '../Button/button';
import { API_ENDPOINT } from '../../../config';
import VideoListItem from './videoListItem';


export default class VideosList extends Component {

    state = {
        teams: [],
        videos: [],
        start: 0,
        end: 0
    }

    componentWillMount = async () => {
        await this.fetchTeams();
        this.fetchVideos(this.props.start, this.props.start + this.props.amount);
    }

    render = () => this.renderView()


    renderView() {
        return (
            <div className={styles.VideosList}>
                {this.renderTitle()}
                {this.renderRelatedVideos()}
                {this.renderButton()}
            </div>
        );
    }




    fetchTeams = async () => {
        const { data } = await axios.get(`${API_ENDPOINT}/teams`);
        this.setState({ teams: data });
    }

    fetchVideos = async (start, end) => {
        const { data } = await axios.get(`${API_ENDPOINT}/videos?_start=${start}&_end=${end}`);

        this.setState((state) => {
            return { videos: state.videos.concat(data), start, end }
        });
    }

    onFetchMore = async () => {
        await this.fetchVideos(this.state.end, this.state.end  + this.props.amount)
    }




    renderTitle = () => {
        return this.props.title ? <h3> <strong>NBA</strong> Videos</h3> : null;
    }

    renderButton = () => {
        const text = this.props.loadmore ? 'Load More' : 'More Videos'
        const props = {
            type: 'loadmore',
            // linkTo: this.props.loadmore ? '' : '/videos',
            clicked: this.onFetchMore,
        }
        return <Button {...props} >{text}</Button>
    }


    renderRelatedVideos = () => {
        return this.state.videos.map((vid, index) => {
            return <VideoListItem key={index} type={this.props.type} video={vid} team={this.state.teams.find((team) => team.id === vid.team)} />;
        })
    }

}
