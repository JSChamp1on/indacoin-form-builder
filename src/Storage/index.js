import { STORAGE, OPTIONS } from '../constants.json';


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
    LNG,
} = OPTIONS;

let instance = null;

export const Storage = class {
    constructor() {
        this.state = {
            // i18n
            [LNG]: '',
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
        };

        this.callbacks = [];
    }

    /**
     * Singleton
     */
    static getInstance() {
        if (instance === null) {
            instance = new this;
        }

        return instance;
    }

    /**
     * Store state
     * set object and return state
     * @param {*} object 
     */
    store(object) {
        if (typeof object === 'object') {
            this.state = {
                ...this.state,
                ...object,
            };

            this.callbacks.forEach(item => item(this.state));
        }

        return this.state;
    }

    /**
     * Adding a subscription to change state
     * @param {*} object 
     */
    set subscription(callback) {
        if (typeof callback === 'function') {
            if (!this.callbacks.some(item => item.toString() === callback.toString())) {
                this.callbacks.push(callback);
            }
        }
    }

    /**
     * deleting a state change subscription
     * @param {*} object 
     */
    removeSubscription(callback) {
        if (typeof callback === 'function') {
            for (const index in this.callbacks) {
                if (this.callbacks[index].toString() === callback.toString()) {
                    this.callbacks.splice(index, 1);
                }
            }
        }
    }
};