import React from 'react';
import TeamInfo from '../Elements/teamInfo';



const VideoHeader = ({team, date, author}) => {
    return (
        <div>
            <TeamInfo team={team} />
        </div>
    );
}

export default VideoHeader;
