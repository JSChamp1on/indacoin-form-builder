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
        let error = event.fiatcurrency.onError({ id: 1 });

        if (typeof onError === 'function') {
            error = onError(error) || error;
        }
        
        this.setState({
            items: state[AMOUNTFEUDALCURRENCY],
            value: state[AMOUNTVALUEFEUDAL],
            currency: state[AMOUNTCURRENCYFIAT],
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
                onSelected={event.fiatcurrency.onSelected}
                onChange={event.fiatcurrency.onChange}
                onPaste={event.fiatcurrency.onPaste}
                onFocus={event.fiatcurrency.onFocus}
                onBlur={event.fiatcurrency.onBlur}
            />
        );
    }
};

export {
    Input,
}