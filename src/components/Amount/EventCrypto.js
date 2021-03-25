// worker
import { Worker } from '.';

// storage
import { GlobalStorage } from '@storage';

// constants
import { STORAGE } from '../../constants.json';

const 
{
    AMOUNTVALUEIN,
    AMOUNTVALUEOUT,

    AMOUNTVALUECRYPTO,
    AMOUNTFIATCURRENCY,
    AMOUNTCRYPTOCURRENCY,
    AMOUNTCURRENCYFIAT,
    AMOUNTCURRENCYCRYPTO,
    AMOUNTONREADYCHANGE,
} = STORAGE;


const worker = new Worker();
const globalStorage = GlobalStorage.getInstance();
const errorsControl = {};

const format = ({ value }) => {
    const onlyNumbers = value.replace(/[^0-9.]/g, '');
    const amount = onlyNumbers.replace(/^((?:0)(\d+)|(?<!0)(\d+))?(\.)?(\d{1,8})?(\d+)?$/, (str, p1, p2, p3, p4, p5) => {
        if (p1 && p2 && !p4 && !p5) {
            return `0.${p2}`;
        }
        
        if (!p1 && p4 && p5) {
            return `0${p4}${p5}`;
        }
        
        if (p1 && p3 && !p4 && !p5) {
            return str;
        }
        
        if (p1 && p4 && p5) {
            return `${p1}${p4}${p5}`;
        }
        
        return str;
    });

    return amount;
};

export const onChange = () => {};

export const onPaste = () => {};

export const onFocus = () => {};

export const onBlur = () => {};

export const onSelected = ({ short_name: s_name }) => {
    const store = globalStorage.store();

    const { short_name } = store[AMOUNTCRYPTOCURRENCY].find(({ short_name }) => short_name === s_name);

    globalStorage.store({
        [AMOUNTCURRENCYCRYPTO]: short_name,
    });

    worker.getCoinConvertAmount();
};

export const onError = () => {};