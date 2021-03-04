import { allCountries } from '.';

import { GlobalStorage } from '@storage';

// constants
import { STORAGE, PHONE } from '../../constants.json';
const {
    PHONEALLCOUNTRIES,
    PHONEBLOCKEDCOUNTRIES,
    PHONENUMBER,
    PHONEALPHA2,
    PHONECOUNTRY,
    PHONEDIALCODE,
    PHONEERRORSTRING,
    PHONEERRORBOOLEAN,
    PHONENATIONALFORMAT,
    PHONEINTERNATIONALFORMAT,
} = STORAGE;
const {
    INVALID_COUNTRY_CODE,
    INVALID_LENGTH,
    IS_POSSIBLE,
    IS_POSSIBLE_LOCAL_ONLY,
    TOO_LONG,
    TOO_SHORT,
    BLOCKED_COUNTRY,
} = PHONE;


const storage = GlobalStorage.getInstance();

export const Worker = class {
    constructor() {
        this.intlTelInputUtils = window.intlTelInputUtils;

        // const
        this.INTERNATIONAL = this.intlTelInputUtils.numberFormat.INTERNATIONAL;
        this.NATIONAL = this.intlTelInputUtils.numberFormat.NATIONAL;

        this.regexp = number => String(number).replace(/\D/g, '');

        storage.store({ [PHONEALLCOUNTRIES]: allCountries });
    }

    updateBlockedCountries({ countries }) {
        return Array.isArray(countries) && countries || [];
    }

    handyman({ phone, alpha2, blockedCountries }, callback) {
        let store = {};

        // phone handling
        if (phone) {
            const { name, alpha2, dialCode } = this.country({ phone });
            const errorString = this.isValidError({ phone, alpha2 });
            const errorBoolean = this.isValidBool({ phone });
            const nationalFormat = this.nationalFormat({ phone });
            const internationalFormat = this.internationalFormat({ phone });

            store[PHONENUMBER] = this.regexp(phone);
            store[PHONEALPHA2] = alpha2;
            store[PHONECOUNTRY] = name;
            store[PHONEDIALCODE] = dialCode;
            store[PHONEERRORSTRING] = errorString;
            store[PHONEERRORBOOLEAN] = errorBoolean;
            store[PHONENATIONALFORMAT] = nationalFormat;
            store[PHONEINTERNATIONALFORMAT] = internationalFormat;
        }

        // alpha2 handling
        if (alpha2 && !phone) {
            const { name, dialCode } = this.readCode({ alpha2 });
            
            store[PHONECOUNTRY] = name;
            store[PHONEDIALCODE] = dialCode;
        }

        // blockedCountries handling
        if (blockedCountries) {
            store[PHONEBLOCKEDCOUNTRIES] = this.updateBlockedCountries({ countries: blockedCountries });
        }
        
        const mergeStore = {
            ...storage.store(),
            ...store,
        };

        if (callback === false) {
            return mergeStore;
        }

        if (typeof callback === 'function') {
            callback(mergeStore);

            return mergeStore;
        }

        return storage.store(mergeStore);
    }

    readCode({ alpha2 }) {
        if (typeof alpha2 !== 'string') {
            return null;
        }

        const { name, dialCode } = storage.store()[PHONEALLCOUNTRIES].find(({ iso2 }) => iso2 === alpha2.toLowerCase()) || {};

        if (storage.store()[PHONEBLOCKEDCOUNTRIES].find(item => String(item).toLowerCase() === alpha2.toLowerCase())) {
            return {};
        }

        return { name, dialCode };
    }

    country({ phone }) {
        if (typeof phone !== 'string') {
            return null;
        }

        const number = `+${this.regexp(phone)}`;

        const
        sort = ({ priority: a }, { priority: b }) => b - a,
        find = ({ dialCode, areaCodes }) => {
            const 
            codeGlobaly = number.indexOf(dialCode) === 1,
            codeCountry = Array.isArray(areaCodes) && areaCodes.some(item => number.substr(2).indexOf(item) === 0);

            return codeGlobaly && (codeCountry || areaCodes === null);
        };
        const { name, iso2, dialCode } = storage.store()[PHONEALLCOUNTRIES].sort(sort).find(find) || {name: '', iso2: '', dialCode: ''};

        return {
            name,
            alpha2: iso2,
            dialCode,
        };
    }
    
    internationalFormat({ phone }) {
        if (typeof phone !== 'string') {
            return null;
        }

        const number = `+${this.regexp(phone)}`;

        return this.intlTelInputUtils.formatNumber(number, null, this.INTERNATIONAL);
    }
    
    nationalFormat({ phone }) {
        if (typeof phone !== 'string') {
            return null;
        }

        const number = `+${this.regexp(phone)}`;

        return this.intlTelInputUtils.formatNumber(number, null, this.NATIONAL);
    }

    isValidBool({ phone }) {
        if (typeof phone !== 'string') {
            return null;
        }

        const number = this.regexp(phone);

        return this.intlTelInputUtils.isValidNumber(number);
    }

    isValidError({ phone, alpha2 }) {
        if (typeof phone !== 'string') {
            return null;
        }

        const {
            INVALID_COUNTRY_CODE: CODE_INVALID_COUNTRY_CODE,
            INVALID_LENGTH: CODE_INVALID_LENGTH,
            IS_POSSIBLE: CODE_IS_POSSIBLE,
            IS_POSSIBLE_LOCAL_ONLY: CODE_IS_POSSIBLE_LOCAL_ONLY,
            TOO_LONG: CODE_TOO_LONG,
            TOO_SHORT: CODE_TOO_SHORT,
        } = this.intlTelInputUtils.validationError;

        const number = this.regexp(phone);

        let errorCode = this.intlTelInputUtils.getValidationError(`+${number}`);

        if (!alpha2) {
            alpha2 = this.country({ phone: number }).alpha2;
        }
        errorCode = storage.store()[PHONEBLOCKEDCOUNTRIES].find(item => `${item}`.toLowerCase() === alpha2) ? BLOCKED_COUNTRY : errorCode;

        let errorStatus = null;
        switch (errorCode) {
            case CODE_INVALID_COUNTRY_CODE:
                errorStatus = INVALID_COUNTRY_CODE;
                break;
            case CODE_INVALID_LENGTH:
                errorStatus = INVALID_LENGTH;
                break;
            case CODE_IS_POSSIBLE:
                errorStatus = IS_POSSIBLE;
                break;
            case CODE_IS_POSSIBLE_LOCAL_ONLY:
                errorStatus = IS_POSSIBLE_LOCAL_ONLY;
                break;
            case CODE_TOO_LONG:
                errorStatus = TOO_LONG;
                break;
            case CODE_TOO_SHORT:
                errorStatus = TOO_SHORT;
                break;
            case BLOCKED_COUNTRY:
                errorStatus = BLOCKED_COUNTRY;
        }

        return errorStatus;
    }
};