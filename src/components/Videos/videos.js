import React from 'react';
import VideosList from '../widgets/VideosList/videosList';

const Videos = () => {
    return (
        <div>
               <VideosList
                type="card"
                title={false}
                loadmore={false}
                start={0}
                amount={10}
            />
        </div>
    );
}

export default Videos;
