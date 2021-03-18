// libs
import React from 'react';

// classes
import { Worker } from './Worker';
import { Input as AmountFiat } from './InputFiat';
import { Input as AmountCrypto } from './InputCrypto';
import {
    onChange as onChangeFiat,
    onPaste as onPasteFiat,
    onFocus as onFocusFiat,
    onBlur as onBlurFiat,
    onError as onErrorFiat,
    onSelected as onSelectedFiat,
} from './EventFiat';
import {
    onChange as onChangeCrypto,
    onPaste as onPasteCrypto,
    onFocus as onFocusCrypto,
    onBlur as onBlurCrypto,
    onError as onErrorCrypto,
    onSelected as onSelectedCrypto,
} from './EventCrypto';


new Worker();

export const event = {
    fiatcurrency: {
        onChange: onChangeFiat,
        onPaste: onPasteFiat,
        onFocus: onFocusFiat,
        onBlur: onBlurFiat,
        onError: onErrorFiat,
        onSelected: onSelectedFiat,
    },
    cryptocurrency: {
        onChange: onChangeCrypto,
        onPaste: onPasteCrypto,
        onFocus: onFocusCrypto,
        onBlur: onBlurCrypto,
        onError: onErrorCrypto,
        onSelected: onSelectedCrypto,
    },
};
;
export const Input = {
    fiatcurrency: (props) => <AmountFiat {...props}/>,
    cryptocurrency: (props) => <AmountCrypto {...props}/>,
};
export {
    Worker,
};