import { Worker } from '.';
import { Storage } from '../../Storage';

// constants
import { STORAGE, PHONE } from '../../constants.json';
const 
{
    // Phone
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
    INVALID_COUNTRY_CODE,
    INVALID_LENGTH,
    IS_POSSIBLE,
    IS_POSSIBLE_LOCAL_ONLY,
    TOO_LONG,
    TOO_SHORT,
    BLOCKED_COUNTRY,
} = PHONE;


const worker = new Worker();
const storage = Storage.getInstance();
const errorsControl = {};

const callback = (store, nationalFormatBool = false) => {
    storage.store({
        ...store,
        [PHONEVALUE]: (
            nationalFormatBool
            ? (
                store[PHONEERRORSTRING] === IS_POSSIBLE
                ? store[PHONENATIONALFORMAT]
                : store[PHONEINTERNATIONALFORMAT]
            )
            : store[PHONEINTERNATIONALFORMAT]
        ).replace(/^\+(?!.+)$/, ''),
    });
};

export const onChange = ({ target }) => {
    worker.handyman({
        phone: target.value,
    }, callback);
};

export const onPaste = ({ target }) => {
    worker.handyman({
        phone: target.value,
    }, callback);
};

export const onFocus = () => {
    storage.store({
        [PHONEVALUE]: storage.store()[PHONEINTERNATIONALFORMAT],
    });
};

export const onBlur = ({ target }) => {
    const store = storage.store();

    worker.handyman({
        phone: target.value,
    }, store => callback(store, true));
};

export const onSelected = ({ dialCode }) => {
    const store = storage.store();
    const code = store[PHONEDIALCODE];
    const number = store[PHONENUMBER];
    worker.handyman({
        phone: number.replace(new RegExp(`^${code}`), dialCode),
    }, store => callback(store, true));
};

export const onError = ({ id } = { id: null }) => {
    const store = storage.store();

    if (id !== null) {
        if (errorsControl[id] === undefined) {
            errorsControl[id] = false;
        }

        if (store[PHONEERRORSTRING] === IS_POSSIBLE) {
            errorsControl[id] = true;
        }

        if (!errorsControl[id]) {
            return '';
        }
    }
    
    if (store[PHONEERRORSTRING] === IS_POSSIBLE) {
        return '';
    }

    return store[PHONEERRORSTRING];
};