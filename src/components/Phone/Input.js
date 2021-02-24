import React, { Component } from 'react';

// styles
import styles from './styles.scss';

// components
import { Input as BasicInput } from '../Input';
import { Storage } from '../../Storage';

// constants
import { STORAGE, OPTIONS } from '../../constants.json';
const {
    PHONEALLCOUNTRIES,
} = STORAGE;

const storage = Storage.getInstance();

const Input = class extends Component {
    render() {
        return (
            <BasicInput
                positionMenu={OPTIONS.POSITIONMENULEFT}
                items={storage.store()[PHONEALLCOUNTRIES]}
                render={({ name, iso2, dialCode }) => {
                    return (
                        <div className={styles.renderBasicInput}>
                            <span>{ `+${dialCode}` }</span>
                            <span>{ name }</span>
                        </div>
                    );
                }}
                maxHeight={400}
            />
        );
    }
}

export {
    Input,
}