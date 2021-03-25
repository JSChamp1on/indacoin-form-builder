// storage
import { Methods } from '.';

// constants
import { REQUESTS } from '../constants.json';
const
{
    GETCOINCONVERTAMOUNT,
    MOBGETCURRENCIESINFO,
} = REQUESTS;


let instance = null;

export const RequestsStorage = class extends Methods {
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
            [GETCOINCONVERTAMOUNT]: {
                readyState: '',
                status: 0,
                percent: '',
                byte: '',
            },
            [MOBGETCURRENCIESINFO]: {
                readyState: '',
                status: 0,
                percent: '',
                byte: '',
            }
        };

        this.callbacks = [];
        
        this.store = super.store;
        this['set subscription'] = super.subscription;
        this.removeSubscription = super.removeSubscription;
    }
};