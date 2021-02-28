import React, { Component } from 'react';
import { Storage } from './Storage';
import { GetCoinConvertAmount } from '@requests';

// components
import { Worker, Input } from './components/Phone';


const storage = Storage.getInstance();

const getCoinConvertAmount = GetCoinConvertAmount.getInstance();
getCoinConvertAmount.request({
    currencyFrom: 'USD',
    currencyTo: 'BTC',
    amount: '1000',
    partner: 'indacoin',
}).response({
    successCallback: ({ data }) => console.log(data),
    failedCallback: ({ data }) => console.log(data),
});



const App = class extends Component {
    constructor() {
        super();

        storage.subscription = data => console.log(data);

        window.worker = new Worker();
    }

    render() {
        return <>
            <Input/>
        </>;
    }
};

export default App;
export {
    storage,
}