import React, { Component } from 'react';
// import { GlobalStorage } from '@storage';
// import { GetCoinConvertAmount } from '@requests';

// components
import { Input as Phone } from '@components/Phone';
import { Input as Amount } from '@components/Amount';
import { Input as Email } from '@components/Email';
import { Input as CardNumber } from '@components/CardNumber';


// const globalStorage = GlobalStorage.getInstance();

// const getCoinConvertAmount = GetCoinConvertAmount.getInstance();
// getCoinConvertAmount.request({
//     currencyIn: 'USD',
//     currencyOut: 'BTC',
//     amount: '1000',
//     partner: 'indacoin',
// }).response({
//     successCallback: ({ data }) => console.log(data),
//     failedCallback: ({ data }) => console.log(data),
// });


const App = class extends Component {
    render() {
        return <>
            <Phone/>
            <Amount.fiatcurrency/>
            <Amount.cryptocurrency/>
            <Email/>
            <CardNumber/>
        </>;
    }
};

export default App;