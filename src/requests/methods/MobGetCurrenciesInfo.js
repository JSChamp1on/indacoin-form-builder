// requests
import { BaseRequest } from '@requests';

// storage
import { RequestsStorage } from '@storage';

// constants
import { REQUESTS } from '../../constants.json';

const {
    MOBGETCURRENCIESINFO,
} = REQUESTS;

const requestStorage = RequestsStorage.getInstance();

let instance = null;


export const MobGetCurrenciesInfo = class extends BaseRequest {
    static getInstance() {
        if (instance === null) {
            instance = new this;
        }

        return instance;
    }

    constructor() {
        super();

        this.promise = null;
    }

    request() {
        const url = `https://indacoin.com/api/uni/mobgetcurrenciesinfoi/1`;

        const onReadyChange = ({ readyState, status }) => requestStorage.store({
            [MOBGETCURRENCIESINFO]: {
                ...requestStorage.store()[MOBGETCURRENCIESINFO],
                readyState,
                status,
            },
        });
        const onProgress = ({ percent, byte }) => requestStorage.store({
            [MOBGETCURRENCIESINFO]: {
                ...requestStorage.store()[MOBGETCURRENCIESINFO],
                percent,
                byte,
            },
        });

        this.promise = new Promise((resolve, reject) => this.get({
            url,
            onReadyChange,
            onProgress,
        }).then(resolve, reject));

        return instance;
    }

    response({ successCallback, failedCallback }) {
        if (typeof successCallback === 'function') {
            this.promise.then(successCallback);
        }
        
        if (typeof failedCallback === 'function') {
            this.promise.catch(failedCallback);
        }
    }
};