// libs
import React, { Component } from 'react';

// styles
import styles from './styles.scss';

// components
import { Input as BasicInput } from '@components/Input';
import { GlobalStorage } from '@storage';
import { event } from '.';

// constants
import { STORAGE, OPTIONS } from '../../constants.json';
const 
{
    AMOUNTFEUDALCURRENCY,
    AMOUNTCRYPTOCURRENCY,
    AMOUNTVALUEFEUDAL,
    AMOUNTVALUECRYPTO,
    AMOUNTCURRENCYFIAT,
    AMOUNTCURRENCYCRYPTO,
} = STORAGE;

const globalStorage = GlobalStorage.getInstance();


const Input = class extends Component {
    constructor() {
        super();

        this.state = {
            items: [],
            value: '',
            currency: '',
            error: '',
        };
    }

    componentDidMount() {
        globalStorage.subscription = this.subscription.bind(this);
    }

    componentWillUnmount() {
        globalStorage.removeSubscription(this.subscription);
    }

    subscription(state) {
        const { target, onError } = this.props;
        let error = event.cryptocurrency.onError({ id: 1 });

        if (typeof onError === 'function') {
            error = onError(error) || error;
        }
        
        this.setState({
            items: state[AMOUNTCRYPTOCURRENCY],
            value: state[AMOUNTVALUECRYPTO],
            currency: state[AMOUNTCURRENCYCRYPTO],
        });
    }

    render() {
        const
        {
            label,
        } = this.props,
        {
            items,
            value,
            currency,
            error,
        } = this.state;

        return (
            <BasicInput
                button={currency}
                label={`${label || 'Amount'}`}
                positionMenu={OPTIONS.POSITIONMENURIGHT}
                items={items}
                render={({ short_name }) => {
                    return (
                        <div className={styles.renderBasicInput}>
                            <span>{ short_name }</span>
                        </div>
                    );
                }}
                maxHeight={400}
                value={value}
                error={error}
                onSelected={event.cryptocurrency.onSelected}
                onChange={event.cryptocurrency.onChange}
                onPaste={event.cryptocurrency.onPaste}
                onFocus={event.cryptocurrency.onFocus}
                onBlur={event.cryptocurrency.onBlur}
            />
        );
    }
};

export {
    Input,
}