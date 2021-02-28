// requests
import { BaseRequest, RequestStorage } from '@requests';

// constants
import { REQUESTS } from '../../constants.json';

const {
    GETCOINCONVERTAMOUNT,
} = REQUESTS;



let instance = null;

const requestStorage = RequestStorage.getInstance();

export const GetCoinConvertAmount = class extends BaseRequest {
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

    request({ currencyFrom, currencyTo, amount, partner }) {
        const onReadyChange = () => {};
        const onProgress = () => {};

        this.promise = new Promise((resolve, reject) => this.get({
            url: `/api/GetCoinConvertAmount/${currencyFrom}/${currencyTo}/${amount}/${partner}`,
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