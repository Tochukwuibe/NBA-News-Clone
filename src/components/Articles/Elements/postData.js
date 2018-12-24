import React from 'react';
import styles from '../articles.module.css';
import * as moment from 'moment';

const PostData = ({ author, date }) => {
    return (
        <div className={styles.PostData}>
            <div>
                Date: <span>{moment(date).format(' MM-DD-YYYY')}</span>
            </div>
            <div>
                Author: <span className={styles.PostAuthor}>{author}</span>
            </div>
        </div>
    );
}

export default PostData;
