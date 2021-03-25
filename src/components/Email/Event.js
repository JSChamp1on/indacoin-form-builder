// storage
import { GlobalStorage } from '@storage';

// constants
import { STORAGE, EMAIL } from '../../constants.json';
const 
{
    EMAILVALUE,
    EMAILERRORSTRING,
} = STORAGE,
{
    IS_POSSIBLE,
    WRONG_EMAIL,
} = EMAIL;


const globalStorage = GlobalStorage.getInstance();
let valid = null;

const check = ({ value }) => /^(?!.*\.{2}|.*_{2}|\.)[A-Za-z\d-_.+]+(?<!\.)@([a-z\d-_]{2,}\.)?[a-z\d-_]{2,}\.[a-z]{2,7}$/.test(value);

export const onChange = ({ target }) => {
    const bool = check(target);

    globalStorage.store({
        [EMAILVALUE]: target.value,
        [EMAILERRORSTRING]: valid === null ? '' : bool ? IS_POSSIBLE : WRONG_EMAIL,
    });

    if (bool) {
        valid = WRONG_EMAIL;
    }
};

export const onPaste = ({ clipboardData }) => {
    const textPlain = { value: clipboardData.getData('text/plain') };
    const bool = check(textPlain);

    globalStorage.store({
        [EMAILERRORSTRING]: bool ? IS_POSSIBLE : WRONG_EMAIL,
    });

    if (!bool) {
        valid = WRONG_EMAIL;
    }
};

export const onFocus = () => {
    globalStorage.store({
        [EMAILERRORSTRING]: '',
    });
};

export const onBlur = ({ target }) => {
    const bool = check(target);

    globalStorage.store({
        [EMAILERRORSTRING]: target.value === '' ? '' : bool ? IS_POSSIBLE : WRONG_EMAIL,
    });
    
    valid = null;
};

export const onError = () => {
    return globalStorage.store()[EMAILERRORSTRING];
};