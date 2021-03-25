// libs
import React from 'react';

// styles 
import styles from './styles.scss';


export const Ellipsis = () => (
    <div className={styles['lds-ellipsis']}>
        {
            new Array(4).fill(<div/>).map((item, index) => ({ ...item, key: index }))
        }
    </div>
);