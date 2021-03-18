// storage
import { GlobalStorage } from '@storage';

// constants
import { STORAGE, PHONE } from '../../constants.json';
const 
{
    AMOUNTVALUEFEUDAL,
    AMOUNTVALUECRYPTO,
    AMOUNTFEUDALCURRENCY,
    AMOUNTCRYPTOCURRENCY,
    AMOUNTCURRENCYFIAT,
    AMOUNTCURRENCYCRYPTO,
} = STORAGE,
{
    // INVALID_COUNTRY_CODE,
    // INVALID_LENGTH,
    // IS_POSSIBLE,
    // IS_POSSIBLE_LOCAL_ONLY,
    // TOO_LONG,
    // TOO_SHORT,
    // BLOCKED_COUNTRY,
} = PHONE;


const globalStorage = GlobalStorage.getInstance();
const errorsControl = {};

export const onChange = ({ target }) => {
    const { value } = target;
    
    const onlyAmount = value.replace(/[^0-9.]/g, '');
    const actualAmount = onlyAmount.replace(/^(\d+\.?)(\d{1,8})?(\d+)?$|^(\.\d+)$/, (match, p1, p2, p3, p4) => {
        if (p4) {
            return `0${p4}`;
        }

        if (p1 && p2) {
            return p1 + p2;
        }

        return p1;
    });

    console.log(actualAmount)
    globalStorage.store({
        [AMOUNTVALUEFEUDAL]: actualAmount,
    });
};

export const onPaste = ({ target }) => {
    // worker.handyman({
    //     phone: target.value,
    // }, callback);
};

export const onFocus = () => {
    // storage.store({
    //     [PHONEVALUE]: storage.store()[PHONEINTERNATIONALFORMAT],
    // });
};

export const onBlur = ({ target }) => {
    // const store = storage.store();

    // worker.handyman({
    //     phone: target.value,
    // }, store => callback(store, true));
};

export const onSelected = ({ short_name: s_name }) => {
    const store = globalStorage.store();

    const { short_name } = store[AMOUNTFEUDALCURRENCY].find(({ short_name }) => short_name === s_name);

    globalStorage.store({
        [AMOUNTCURRENCYFIAT]: short_name,
    });
};

export const onError = ({ id } = { id: null }) => {
    // const store = storage.store();

    // if (id !== null) {
    //     if (errorsControl[id] === undefined) {
    //         errorsControl[id] = false;
    //     }

    //     if (store[PHONEERRORSTRING] === IS_POSSIBLE) {
    //         errorsControl[id] = true;
    //     }

    //     if (!errorsControl[id]) {
    //         return '';
    //     }
    // }
    
    // if (store[PHONEERRORSTRING] === IS_POSSIBLE) {
    //     return '';
    // }

    // return store[PHONEERRORSTRING];
};