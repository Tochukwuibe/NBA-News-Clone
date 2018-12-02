import React, { Component } from 'react'
import styles from '../articles.module.css';
import axios from 'axios';
import { API_ENDPOINT } from '../../../config';
import VideoHeader from './header';
import VideoListItem from '../../widgets/VideosList/videoListItem';

export default class videoArticle extends Component {


  state = {
    video: null,
    team: null,
    teams: [],
    related: []
  }

  render = () => {
    return this.renderView()
  }

  componentWillMount = async () => {
    await this.fetchArticle();
    await this.fetchTeam();
    await this.fetchTeams();
    await this.fetchRelated();
    console.log('the state ', this.state);
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
    let view = <p>Loading...</p>
    if (this.state.related.length > 0) {
      view = (
        <div className={styles.RelatedWrapper}>
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


  fetchArticle = async () => {
    const articleId = this.props.match.params.id;
    const { data } = await axios.get(`${API_ENDPOINT}/videos/${articleId}`);
    this.setState((state) => {
      return { video: data }
    })
  }

  fetchTeam = async () => {

    const { data } = await axios.get(`${API_ENDPOINT}/teams?id=${this.state.video.team}`);
    this.setState({ team: data[0] });

  }

  fetchRelated = async () => {
    const { data } = await axios.get(`${API_ENDPOINT}/videos?q=${this.state.team.city}&_limit=3`);

    this.setState({ related: data });
  }
  fetchTeams = async () => {

    const { data } = await axios.get(`${API_ENDPOINT}/teams`);
    this.setState({ teams: data });

  }
}
