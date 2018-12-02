import React from 'react'
import Slider from '../widgets/Slider/slider';
import NewsList from '../widgets/NewsList/newsList';

export default () => {


    return (
        <div>
            <Slider
                settings={{ dots: false }}
                type="featured"
                start={0}
                amount={6}
            />
            <NewsList
                type="img-card"
                loadMore={true}
                start={0}
                amount={5}
            />
        </div>
    );

}
