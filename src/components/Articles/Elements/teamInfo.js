import React from 'react';
import styles from '../articles.module.css';

const TeamInfo = ({ team }) => {
    return (
        <div className={styles.ArticleTeamHeader}>

            <div className={styles.Left} 
            style={{background: `url(/assets/images/teams/${team.logo})`}}>

            </div>

            <div className={styles.Right}>
                    <div>
                        <span>{team.city} {team.name}</span>
                    </div>
                    <div>
                        <strong>
                            W{team.stats[0].wins} -L{team.stats[0].defeats}
                        </strong>
                    </div>
            </div>

        </div>
    );
}

export default TeamInfo;
