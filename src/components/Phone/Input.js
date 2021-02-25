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
    PHONEBLOCKEDCOUNTRIES,
    PHONEVALUE,
    PHONENUMBER,
    PHONEALPHA2,
    PHONECOUNTRY,
    PHONEDIALCODE,
    PHONEERRORSTRING,
    PHONEERRORBOOLEAN,
    PHONENATIONALFORMAT,
    PHONEINTERNATIONALFORMAT,
} = STORAGE,
{
    LABEL,
    IS_POSSIBLE,
} = PHONE;



const storage = Storage.getInstance();


const test = async () => {

    // http://ovh.net/files/100Mb.dat
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://indacoin.com/inner/RefreshPairDataNew', true);
    xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onprogress = (event) => {
        console.log(event)
        const { loaded, total } = event;
        console.log(total && `${Math.round(loaded / total * 100)}%` || `${loaded} byte`);
    }
    xhr.onreadystatechange = () => {
        // DONE: 4 // запрос завершен и ответ готов
        // HEADERS_RECEIVED: 2 // запрос получен
        // LOADING: 3 // обработка запроса
        // OPENED: 1 // установлено соединение с сервером
        // UNSENT: 0 // запрос не инициализирован
        console.log(xhr)
        console.log('readyState: ', xhr.readyState);
    }
    xhr.send(JSON.stringify({
        pair: "INDA_ETH"
    }));
};
test();


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