import React, { Component } from 'react'
import styles from './videosList.module.css'
import Button from '../Button/button';
import VideoListItem from './videoListItem';
import { db } from '../../../app-firebase';


export default class VideosList extends Component {

    state = {
        teams: [],
        videos: [],
        start: 0,
        stop: 0,
        done: false
    }

    componentWillMount = async () => {
        await this.fetchVideos(this.props.start, this.props.start + this.props.amount);
    }

    render = () => this.renderView()


    renderView() {
        let view = (<p>Loading...</p>)

        if (this.state.videos.length && this.state.teams.length) {
            view = (
                <div className={styles.VideosList}>
                    {this.renderTitle()}
                    {this.renderRelatedVideos()}
                    {this.renderButton()}
                </div>
            );
        }
        return view;
    }




    fetchTeams = async (videos) => {

        return await Promise.all(
            videos.map(async (video) => {
                const snap = await db.ref('teams').orderByChild('id').equalTo(+video.team).limitToFirst(1).once('value');
                return Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], key }))[0];
            }))
    }

    fetchVideos = async (start, stop) => {
        const snap = await db.ref('videos').orderByChild('id').startAt(start).limitToFirst(stop).once('value');
        const videos = !!snap.val() ? Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], key })) : [];
        const teams = await this.fetchTeams(videos)

        this.setState((state) => {
            return { videos: state.videos.concat(videos), teams: state.teams.concat(teams), start, stop, done: !(!!videos.length) }
        });
    }

    onFetchMore = async () => {
        await this.fetchVideos(this.state.start + this.state.stop, this.state.stop)
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
        return !!this.state.done ? null : <Button {...props} >{text}</Button>
    }


    renderRelatedVideos = () => {
        return this.state.videos.map((vid, index) => {
            return <VideoListItem key={index} type={this.props.type} video={vid} team={this.state.teams.find((team) => team.id === vid.team)} />;
        })
    }

}
