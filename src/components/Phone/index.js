// libs
import './utils';
import allCountries from './data';

// classes
import { Worker } from './Worker';
import { Input } from './Input';
import { onChange, onPaste, onFocus, onBlur, onError, onSelected } from './Event';


export const event = {
    onChange,
    onPaste,
    onFocus,
    onBlur,
    onError,
    onSelected,
};
export {
    allCountries,
    Worker,
    Input,
};