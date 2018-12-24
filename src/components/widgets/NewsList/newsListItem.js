import React from 'react';

import styles from './newsList.module.css'
import { Link } from 'react-router-dom';
import CardInfo from '../CardInfo/cardInfo';
import { parseImage } from '../../../utils';

const NewsListItem = ({ art, team, type }) => {

    let template = null;
    console.log('the img url ', parseImage(art.image, 'articles'), type)
    switch (type) {

        case 'card': {

            template = (
                <div>
                    <div className={styles.NewsListItem}>
                        <Link to={`/articles/${art.id}`} >
                            <CardInfo date={art.date} team={team} />
                            <h2>{art.title} </h2>
                        </Link>
                    </div>
                </div>

            )

            break;
        }


        case 'img-card': {

            template = (
                <div className={styles.ImgCardWrapper}>
                    <div
                        className={styles.Left}
                        style={{ background: `url(${parseImage(art.image, 'articles')})` }} >


                        <div></div>
                    </div>
                    <div className={styles.Right}>
                        <Link to={`/articles/${art.id}`} >
                            <CardInfo date={art.date} team={team} />
                            <h2>{art.title} </h2>
                        </Link>
                    </div>
                </div>

            )

            break;
        }

        default: {
            template = null;
        }
    }


    return template;
}

export default NewsListItem;
