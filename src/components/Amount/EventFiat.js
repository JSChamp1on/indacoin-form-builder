// worker
import { Worker } from '.';

// storage
import { GlobalStorage } from '@storage';

// constants
import { STORAGE } from '../../constants.json';
const 
{
    AMOUNTVALUEIN,
    AMOUNTVALUECRYPTO,
    AMOUNTFIATCURRENCY,
    AMOUNTCRYPTOCURRENCY,
    AMOUNTCURRENCYFIAT,
    AMOUNTCURRENCYCRYPTO,
} = STORAGE;


const worker = new Worker();
const globalStorage = GlobalStorage.getInstance();
const errorsControl = {};

const format = ({ value }) => {
    const onlyAmount = value.replace(/[^0-9.]/g, '');
    const amount = onlyAmount.replace(/^((?:0)(\d+)|(?<!0)(\d+))?(\.)?(\d{1,2})?(\d+)?$/, (str, p1, p2, p3, p4, p5) => {
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

export const onChange = ({ target }) => {
    const value = format(target);
    
    globalStorage.store({
        [AMOUNTVALUEIN]: value,
    });

    worker.getCoinConvertAmount();
};

export const onPaste = ({ target }) => {
    const value = format(target);
    
    globalStorage.store({
        [AMOUNTVALUEIN]: value,
    });

    worker.getCoinConvertAmount();
};

export const onFocus = () => {};

export const onBlur = () => {};

export const onSelected = ({ short_name: s_name }) => {
    const store = globalStorage.store();

    const { short_name } = store[AMOUNTFIATCURRENCY].find(({ short_name }) => short_name === s_name);

    globalStorage.store({
        [AMOUNTCURRENCYFIAT]: short_name,
    });

    worker.getCoinConvertAmount();
};

export const onError = ({ id } = { id: null }) => {};