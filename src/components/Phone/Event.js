import { Worker } from '.';
import { GlobalStorage } from '@storage';

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
const globalStorage = GlobalStorage.getInstance();
let valid = null;

const errorStatus = (store) => worker.isValidError({
    phone: store[PHONENUMBER],
    alpha2: store[PHONEALPHA2],
});

const check = (store) => errorStatus(store) === IS_POSSIBLE;

const format = (store) => globalStorage.store({
    ...store,
    [PHONEVALUE]: store[PHONEINTERNATIONALFORMAT].replace(/^\+(?!.+)$/, ''),
});

export const onChange = ({ target }) => {
    const store = worker.handyman({ phone: target.value }, format);
    const strStatus = errorStatus(store);
    const bool = check(store);
    
    globalStorage.store({
        [PHONEERRORSTRING]: valid === null ? '' : strStatus,
    });

    if (bool) {
        valid = strStatus;
    }
};

export const onPaste = ({ target }) => {
    const store = worker.handyman({ phone: target.value }, format);
    const strStatus = errorStatus(store);
    const bool = check(store);
    
    globalStorage.store({
        [PHONEERRORSTRING]: strStatus,
    });

    if (!bool) {
        valid = strStatus;
    }
};

export const onFocus = () => {
    globalStorage.store({
        [PHONEVALUE]: globalStorage.store()[PHONEINTERNATIONALFORMAT],
        [PHONEERRORSTRING]: '',
    });
};

export const onBlur = ({ target }) => {
    const store = worker.handyman({ phone: target.value });
    const strStatus = errorStatus(store);

    globalStorage.store({
        [PHONEVALUE]: globalStorage.store()[PHONENATIONALFORMAT],
        [PHONEERRORSTRING]: target.value === '' ? '' : strStatus,
    });
    
    valid = null;
};

export const onSelected = ({ dialCode }) => {
    const oldStore = globalStorage.store();
    const oldCode = oldStore[PHONEDIALCODE];
    const oldNumber = oldStore[PHONENUMBER];

    const newNember = oldNumber.replace(new RegExp(`^${oldCode}`), dialCode);

    const newStore = worker.handyman({ phone: newNember });
    
    globalStorage.store({
        [PHONEVALUE]: newStore[PHONENATIONALFORMAT],
    });
};

export const onError = () => {
    return globalStorage.store()[PHONEERRORSTRING];
};