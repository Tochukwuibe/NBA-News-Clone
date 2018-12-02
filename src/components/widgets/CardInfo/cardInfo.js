import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './cardInfo.module.css';

const CardInfo = (props) => {
    return (
        <div className={styles.CardInfo}>
            <span className={styles.TeamName}>
                {props.team.name}
           </span>
            <span className={styles.Date}>
                <FontAwesome name="clock-o" />
                {props.date}
            </span>
        </div>
    );
}

export default CardInfo;
