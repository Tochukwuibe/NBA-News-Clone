import React, { Component } from 'react'
import styles from '../articles.module.css';
import VideoHeader from './header';
import VideoListItem from '../../widgets/VideosList/videoListItem';
import { db } from '../../../app-firebase';

export default class videoArticle extends Component {


  state = {
    video: null,
    team: null,
    teams: null,
    related: null
  }

  render = () => {
    return this.renderView()
  }

  componentWillMount = async () => {
    await this.fetchVideo();
    await this.fetchTeam();
    await this.fetchRelatedVideos();
  }



  componentDidUpdate = async (prevProps, prevState) => {

    if (prevProps.match.params.id !== this.props.match.params.id) {
      console.log('id  changed')
      await this.fetchVideo();
      await this.fetchTeam();
      await this.fetchRelatedVideos();
    } else {
      console.log('id didnot change')
    }

  }






  renderView = () => {
    let view = <p>Loading...</p>

    if (this.state.video && this.state.team) {
      view = (
        <div>
          <VideoHeader team={this.state.team} data={this.state.video.date} author={this.state.video.author} />
          <div className={styles.VideoWrapper}>
            <h1>{this.state.video.title} </h1>
            <iframe
              title="videoplayer"
              width="100%"
              height="300px"
              src={`https://www.youtube.com/embed/${this.state.video.url}`}
            >

            </iframe>

            {this.renderRelated()}
          </div>
        </div>
      );
    }

    return view;
  }

  renderRelated = () => {
    let view = (<p>Loading...</p>)

    if (this.state.related) {
      view = (<p style={{ textAlign: 'center' }}>No related videos</p>)
    }

    if (this.state.related && this.state.related.length > 0) {
      view = (
        <div className={styles.RelatedWrapper}>
          <h3>Related Videos</h3>
          {
            this.state.related.map((video, index) => {
              return <VideoListItem type="card" key={index} team={this.state.teams.find((team) => team.id === video.team)} video={video} />
            })
          }
        </div>


      )
    }



    return view;
  }


  fetchVideo = async () => {
    const videoId = this.props.match.params.id;
    const snap = await db.ref('videos').orderByChild('id').equalTo(+videoId).limitToFirst(1).once('value');
    const video = Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], key }))[0];
    this.setState({ video })
  }

  fetchTeam = async () => {
    const snap = await db.ref('teams').orderByChild('id').equalTo(this.state.video.team).limitToFirst(1).once('value');
    const team = Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], key }))[0];
    this.setState({ team });
  }

  fetchRelatedVideos = async () => {

    const snap = await db.ref('videos').orderByChild('team').equalTo(this.state.video.team).limitToFirst(3).once('value'); 
    const related = Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], key }));
    const teams = await this.fetchTeams(related);

    this.setState({ related, teams });
  }


  fetchTeams = async (videos) => {
    return await Promise.all(
      videos.map(async (article) => {
        const snap = await db.ref('teams').orderByChild('id').equalTo(+article.team).limitToFirst(1).once('value');
        return Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], key }))[0];
      }))

  }
}
