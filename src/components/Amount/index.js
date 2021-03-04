// libs
import React from 'react';

// classes
import { Worker } from './Worker';
import { Input as AmountFeudal } from './InputFeudal';
import { Input as AmountCrypto } from './InputCrypto';
import { onChange, onPaste, onFocus, onBlur, onError, onSelected } from './Event';

// constants
import { OPTIONS } from '../../constants.json';


export const event = {
    onChange,
    onPaste,
    onFocus,
    onBlur,
    onError,
    onSelected,
};
export const Input = {
    feudalcurrency: (props) => <AmountFeudal {...props}/>,
    cryptocurrency: (props) => <AmountCrypto {...props}/>,
};
export {
    Worker,
};