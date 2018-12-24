import React from 'react';
import Slick from 'react-slick';
import styles from './slider.module.css'
import { Link } from 'react-router-dom';

const SliderTemplates = (props) => {

    let template = null;
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        ...props.settings
    }
    

    switch (props.type) {
        case 'featured': {
            template = mapFeatured(props.data)

            break;
        }

        default: {
            template = null
        }
    }

    return (
        <Slick {...settings}>
            {template}
        </Slick>
    );
}


const mapFeatured = (data) => {
    return data.map((item, i) => (
        <div key={i}>
            <div className={styles.FeaturedItem}>
                <div className={styles.FeaturedImage}
                    style={{ background: `url(${item.image})` }}
                >
                    <Link to={`/articles/${item.id}`}>
                        <div className={styles.FeaturedCaption}>
                            {item.title}
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    ))
}

export default SliderTemplates;
