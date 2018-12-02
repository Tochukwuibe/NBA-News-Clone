import React from 'react';

import styles from './newsList.module.css'
import { Link } from 'react-router-dom';
import CardInfo from '../CardInfo/cardInfo';

const NewsListItem = ({ art, team, type }) => {

    let template = null;
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
                        style={{ background: `url(/assets/images/articles/${art.image})` }} >


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
