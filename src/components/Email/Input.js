// libs
import React, { Component } from 'react';

// components
import { Input as BasicInput } from '@components/Input';
import { event } from '.';

// storage
import { GlobalStorage } from '@storage';

// constants
import { STORAGE } from '../../constants.json';

const 
{
    EMAILVALUE,
    EMAILERRORSTRING,
    AMOUNTFIATCURRENCY,
    AMOUNTCRYPTOCURRENCY,
    AMOUNTVALUEIN,
    AMOUNTVALUECRYPTO,
    AMOUNTCURRENCYFIAT,
    AMOUNTCURRENCYCRYPTO,
} = STORAGE;


const globalStorage = GlobalStorage.getInstance();

const Input = class extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
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
        this.setState({
            value: state[EMAILVALUE],
            error: state[EMAILERRORSTRING],
        });
    }

    render() {
        const
        {
            label,
            disabled = false,
        } = this.props,
        {
            value,
            error,
        } = this.state;

        return (
            <BasicInput
                label={`${label || 'Email'}`}
                type={'email'}
                value={value}
                error={error}
                onChange={event.onChange}
                onPaste={event.onPaste}
                onFocus={event.onFocus}
                onBlur={event.onBlur}
                disabled={disabled}
            />
        );
    }
};

export {
    Input,
}