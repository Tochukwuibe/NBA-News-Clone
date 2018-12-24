import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './cardInfo.module.css';
import * as moment from 'moment';

const CardInfo = (props) => {
    return (
        <div className={styles.CardInfo}>
            <span className={styles.TeamName}>
                {props.team.name}
           </span>
            <span className={styles.Date}>
                <FontAwesome name="clock-o" />
                {moment(props.date).format(' MM-DD-YYYY')}
            </span>
        </div>
    );
}

export default CardInfo;
