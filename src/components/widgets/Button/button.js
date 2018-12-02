import React from 'react';
import styles from './button.module.css'
import { Link } from 'react-router-dom';

const Button = (props) => {

    let template = null;

    switch (props.type) {
        case 'loadmore': {

            template = (
                <div onClick={props.clicked} className={styles.LoadMore} >
                    {props.children}
                </div>
            )

            break;
        }

        case 'linkTo': {
            template = (
                <Link 
                to={props.linkTo}
                className={styles.LoadMore}
                >
                    {props.children}
                </Link>
            );
            break;
        }
        default: {
            return template;
        }
    }


    return template;
}

export default Button;
