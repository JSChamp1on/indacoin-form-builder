// libs
import React, { Component } from 'react';

// styles
import styles from './styles.scss';

// components
import { event } from '.';
import { Input as BasicInput } from '@components/Input';
import { Ellipsis } from '@components/Ellipsis';

// storage
import { GlobalStorage, RequestsStorage } from '@storage';

// constants
import { STORAGE, OPTIONS, REQUESTS, XHR } from '../../constants.json';
const 
{
    AMOUNTFIATCURRENCY,
    AMOUNTCRYPTOCURRENCY,
    AMOUNTVALUEIN,
    AMOUNTVALUECRYPTO,
    AMOUNTCURRENCYFIAT,
    AMOUNTCURRENCYCRYPTO,
} = STORAGE,
{
    GETCOINCONVERTAMOUNT,
} = REQUESTS,
{
    DONE,
} = XHR;


const globalStorage = GlobalStorage.getInstance();
const requestsStorage = RequestsStorage.getInstance();

const Input = class extends Component {
    constructor() {
        super();

        this.state = {
            items: [],
            value: '',
            currency: '',
            error: '',
            loading: null,
        };
    }

    componentDidMount() {
        globalStorage.subscription = this.subscriptionGlobalStorage.bind(this);
        requestsStorage.subscription = this.subscriptionRequestsStorage.bind(this);
    }

    componentWillUnmount() {
        globalStorage.removeSubscription(this.subscriptionGlobalStorage);
        requestsStorage.removeSubscription(this.subscriptionRequestsStorage);
    }

    subscriptionGlobalStorage(state) {
        this.setState({
            items: state[AMOUNTCRYPTOCURRENCY],
            value: state[AMOUNTVALUECRYPTO],
            currency: state[AMOUNTCURRENCYCRYPTO],
        });
    }

    subscriptionRequestsStorage(state) {
        const { readyState, status } = state[GETCOINCONVERTAMOUNT];
        
        this.setState({
            loading: (
                readyState === DONE && status === 200 || !readyState && status === 0
                    ? null 
                    : status !== 200 && status !== 0
                        ? '☹' 
                        : <Ellipsis/>
            ),
        });
    }

    render() {
        const
        {
            label,
            disabled = true,
        } = this.props,
        {
            items,
            value,
            currency,
            error,
            loading,
        } = this.state;

        return (
            <BasicInput
                button={currency}
                label={loading || `${label || 'Amount'}`}
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
                disabled={disabled}
            />
        );
    }
};

export {
    Input,
}