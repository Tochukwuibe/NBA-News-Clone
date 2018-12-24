import React from 'react';
import styles from './videosList.module.css';
import { Link } from 'react-router-dom';
import CardInfo from '../CardInfo/cardInfo';
import { parseImage } from '../../../utils';


const VideoListItem = (props) => {
    let template = null;
    switch (props.type) {
        case 'card': {
            template = (
                <Link
                    to={`/videos/${props.video.id}`}>
                    <div className={styles.VideoListItem}>

                        <div
                            className={styles.Left}
                            style={{ background: `url(${parseImage(props.video.image, 'videos')})` }} >


                            <div></div>
                        </div>

                        <div className={styles.Right}>
                            <CardInfo date={props.video.date} team={props.team} />
                            <h2>{props.video.title}</h2>

                        </div>
                    </div>
                </Link >
            )
            break;
        }

        default: {

            template = null;
        }
    }

    return template;
}

export default VideoListItem;
