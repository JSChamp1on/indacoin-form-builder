// storage
import { Methods } from '.';

// constants
import { STORAGE } from '../constants.json';
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
    // Amounts
    AMOUNTVALUEIN,
    AMOUNTVALUECRYPTO,
    AMOUNTFIATCURRENCY,
    AMOUNTCRYPTOCURRENCY,
    AMOUNTCURRENCYFIAT,
    AMOUNTCURRENCYCRYPTO,
    // Email
    EMAILVALUE,
    EMAILERRORSTRING,
    // CardNumber
    CARDNUMBERVALUE,
    CARDNUMBERERRORSTRING,
} = STORAGE;


let instance = null;

export const GlobalStorage = class extends Methods {
    /**
     * Singleton
     */
    static getInstance() {
        if (instance === null) {
            instance = new this;
        }

        return instance;
    }

    constructor() {
        super();

        this.state = {
            // Phone
            [PHONEALLCOUNTRIES]: [],
            [PHONEBLOCKEDCOUNTRIES]: [],
            [PHONEVALUE]: '',
            [PHONENUMBER]: '',
            [PHONEALPHA2]: '',
            [PHONECOUNTRY]: '',
            [PHONEDIALCODE]: '',
            [PHONEERRORSTRING]: '',
            [PHONEERRORBOOLEAN]: false,
            [PHONENATIONALFORMAT]: '',
            [PHONEINTERNATIONALFORMAT]: '',
            // Amounts
            [AMOUNTVALUEIN]: '',
            [AMOUNTVALUECRYPTO]: '',
            [AMOUNTFIATCURRENCY]: [],
            [AMOUNTCRYPTOCURRENCY]: [],
            [AMOUNTCURRENCYFIAT]: '',
            [AMOUNTCURRENCYCRYPTO]: '',
            // Email
            [EMAILVALUE]: '',
            [EMAILERRORSTRING]: '',
            // CardNumber
            [CARDNUMBERVALUE]: '',
            [CARDNUMBERERRORSTRING]: '',
        };

        this.callbacks = [];
        
        this.store = super.store;
        this['set subscription'] = super.subscription;
        this.removeSubscription = super.removeSubscription;
    }
};