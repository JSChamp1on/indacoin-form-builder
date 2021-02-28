import React, { Component } from 'react';

// styles
import styles from './styles.scss';
import flags from './flags.scss';

// components
import { Input as BasicInput } from '../Input';
import { Storage } from '../../Storage';
import { event } from '.';

// constants
import { STORAGE, OPTIONS, PHONE } from '../../constants.json';
const 
{
    PHONEALLCOUNTRIES,
    // PHONEBLOCKEDCOUNTRIES,
    PHONEVALUE,
    // PHONENUMBER,
    PHONEALPHA2,
    PHONECOUNTRY,
    // PHONEDIALCODE,
    // PHONEERRORSTRING,
    // PHONEERRORBOOLEAN,
    // PHONENATIONALFORMAT,
    // PHONEINTERNATIONALFORMAT,
} = STORAGE;



const storage = Storage.getInstance();

const Input = class extends Component {
    constructor() {
        super();

        this.state = {
            country: '',
            alpha2: '',
            code: '',
            value: '',
            error: '',
        };

        storage.subscription = this.subscription.bind(this);
    }

    componentWillUnmount() {
        storage.removeSubscription(this.subscription);
    }

    subscription(store) {
        const { onError } = this.props;
        let error = event.onError({ id: 1 });

        if (typeof onError === 'function') {
            error = onError(error) || error;
        }

        this.setState({
            value: store[PHONEVALUE],
            country: store[PHONECOUNTRY],
            alpha2: store[PHONEALPHA2],
            error,
        });
    }

    render() {
        const
        {
            label,
        } = this.props,
        {
            country,
            alpha2,
            code,
            value,
            error,
        } = this.state;

        return (
            <BasicInput
                button={<i className={`${flags.iti_flag} ${alpha2 && flags[`iti_${alpha2}`]}`}/>}
                label={`${label || 'Phone'} ${country}`}
                positionMenu={OPTIONS.POSITIONMENULEFT}
                items={storage.store()[PHONEALLCOUNTRIES]}
                render={({ name, iso2, dialCode }) => {
                    return (
                        <div className={styles.renderBasicInput}>
                            <i className={`${flags.iti_flag} ${flags[`iti_${iso2}`]}`}/>
                            <span>{ `+${dialCode}` }</span>
                            <span>{ name }</span>
                        </div>
                    );
                }}
                maxHeight={400}
                value={value}
                error={error}
                onSelected={event.onSelected}
                onChange={event.onChange}
                onPaste={event.onPaste}
                onFocus={event.onFocus}
                onBlur={event.onBlur}
            />
        );
    }
};

export {
    Input,
}