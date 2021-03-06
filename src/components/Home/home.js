import React from 'react';
import Slider from '../widgets/Slider/slider';
import NewsList from '../widgets/NewsList/newsList';
import VideosList from '../widgets/VideosList/videosList';

const Home = (props) => {

    return (
        <div>
            <Slider
                settings={{ dots: false }}
                type="featured"
                start={0}
                amount={6}
            />

            <NewsList
                type="card"
                loadMore={true}
                start={3}
                amount={3}
            />
            <VideosList
                type="card"
                title={true}
                loadmore={false}
                start={0}
                amount={3}
            />
        </div>
    );
}

export default Home;
