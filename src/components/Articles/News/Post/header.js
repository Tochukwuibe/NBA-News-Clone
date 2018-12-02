import React from 'react';
import TeamInfo from '../../Elements/teamInfo';
import PostData from '../../Elements/postData';

const ArticleHeader = ({ team, date, author }) => {

    return (
        <div>
            {team ? <TeamInfo team={team} /> : null}
            <PostData author={author} date={date} />
        </div>
    );

}



export default ArticleHeader;
