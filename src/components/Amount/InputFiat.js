// libs
import React, { Component } from 'react';

// styles
import styles from './styles.scss';

// components
import { event } from '.';
import { Input as BasicInput } from '@components/Input';

// storage
import { GlobalStorage } from '@storage';

// constants
import { STORAGE, OPTIONS } from '../../constants.json';
const 
{
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
        this.setState({
            items: state[AMOUNTFIATCURRENCY],
            value: state[AMOUNTVALUEIN],
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