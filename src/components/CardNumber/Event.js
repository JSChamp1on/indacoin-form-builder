// libs
import payment from 'payment';

// storage
import { GlobalStorage } from '@storage';

// constants
import { STORAGE, CARDNUMBER } from '../../constants.json';

const 
{
    CARDNUMBERVALUE,
    CARDNUMBERERRORSTRING,
    CARDNUMBERTYPE,
} = STORAGE,
{
    IS_POSSIBLE,
    WRONG_CARDNUMBER,
} = CARDNUMBER;

payment.setCardArray(payment.getCardArray().filter((item) => {
    if(item.type === 'visa') {
        item.length = [16];
    }
    if(item.type === 'mastercard' || item.type === 'visa') {
        return item;
    }
}));

const globalStorage = GlobalStorage.getInstance();
let valid = null;

const
format = ({ value }) => value.replace(/^([0-9]{1,4})?\s?([0-9]{1,4})?\s?([0-9]{1,4})?\s?([0-9]{1,4})?(.+)?$/, (str, p1, p2, p3, p4) => {
    if (/[^0-9\s]/g.test(str)) {
        return format({ value: str.replace(/[^0-9]/g, '') });
    }

    const arr = [];

    if (p1) arr.push(p1);
    if (p2) arr.push(p2);
    if (p3) arr.push(p3);
    if (p4) arr.push(p4);

    return arr.join(' ');
}),
check = ({ value }) => payment.fns.validateCardNumber(value),
paymentSystem = ({ value }) => payment.fns.cardType(value);

export const onChange = ({ target }) => {
    const value = format(target);
    const bool = check({ value });
    const type = paymentSystem({ value });
    
    globalStorage.store({
        [CARDNUMBERVALUE]: value,
        [CARDNUMBERERRORSTRING]: valid === null ? '' : bool ? IS_POSSIBLE : WRONG_CARDNUMBER,
        [CARDNUMBERTYPE]: type,
    });

    if (bool) {
        valid = WRONG_CARDNUMBER;
    }
};

export const onPaste = ({ clipboardData }) => {
    const textPlain = { value: clipboardData.getData('text/plain') };
    const value = format(textPlain);
    const bool = check({ value });
    const type = paymentSystem({ value });
    
    globalStorage.store({
        [CARDNUMBERERRORSTRING]: bool ? IS_POSSIBLE : WRONG_CARDNUMBER,
        [CARDNUMBERTYPE]: type,
    });

    if (!bool) {
        valid = WRONG_CARDNUMBER;
    }
};

export const onFocus = () => {
    globalStorage.store({
        [CARDNUMBERERRORSTRING]: '',
    });
};

export const onBlur = ({ target }) => {
    const bool = check(target);
    console.log(bool, WRONG_CARDNUMBER)

    globalStorage.store({
        [CARDNUMBERERRORSTRING]: target.value === '' ? '' : bool ? IS_POSSIBLE : WRONG_CARDNUMBER,
    });
    
    valid = null;
};

export const onError = () => {
    return globalStorage.store()[CARDNUMBERERRORSTRING];
};