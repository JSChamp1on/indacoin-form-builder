// requests
import { BaseRequest } from '@requests';

// storage
import { RequestsStorage } from '@storage';

// constants
import { REQUESTS } from '../../constants.json';

const {
    GETCOINCONVERTAMOUNT,
} = REQUESTS;

const requestStorage = RequestsStorage.getInstance();

let instance = null;


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

    request({ currencyIn, currencyOut, amount, partner, onReadyChange: readyChange, onProgress: progress } = {}) {
        if (currencyIn && currencyOut && amount) {
            const url = `/api/GetCoinConvertAmount/${currencyIn}/${currencyOut}/${amount}${partner !== undefined ? `/${partner}` : ''}`;

            const onReadyChange = ({ readyState, status }) => {
                requestStorage.store({
                    [GETCOINCONVERTAMOUNT]: {
                        ...requestStorage.store()[GETCOINCONVERTAMOUNT],
                        readyState,
                        status,
                    },
                });

                if (typeof readyChange === 'function') {
                    readyChange({
                        readyState,
                        status,
                    });
                }
            };
            
            const onProgress = ({ percent, byte }) => {
                    requestStorage.store({
                    [GETCOINCONVERTAMOUNT]: {
                        ...requestStorage.store()[GETCOINCONVERTAMOUNT],
                        percent,
                        byte,
                    },
                });

                if (typeof progress === 'function') {
                    progress({
                        percent,
                        byte,
                    });
                }
            };

            this.promise = new Promise((resolve, reject) => this.get({
                url,
                onReadyChange,
                onProgress,
            }).then(resolve, reject));
        }
        

        return instance;
    }

    response({ successCallback, failedCallback }) {
        if (this.promise) {
            if (typeof successCallback === 'function' && typeof this.promise.then === 'function') {
                this.promise.then(successCallback);
            }

            if (typeof failedCallback === 'function' && typeof this.promise.catch === 'function') {
                this.promise.catch(failedCallback);
            }
        }
    }
};