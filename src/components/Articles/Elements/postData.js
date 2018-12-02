import React from 'react';
import styles from '../articles.module.css';


const PostData = ({ author, date }) => {
    return (
        <div className={styles.PostData}>
            <div>
                Date: <span>{date}</span>
            </div>
            <div>
                Author: <span className={styles.PostAuthor}>{author}</span>
            </div>
        </div>
    );
}

export default PostData;
