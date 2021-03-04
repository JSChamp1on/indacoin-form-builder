// requests
import { MobGetCurrenciesInfo } from '@requests';

// storage
import { GlobalStorage } from '@storage';

// constants
import { STORAGE } from '../../constants.json';

const {
    AMOUNTFEUDALCURRENCY,
    AMOUNTCRYPTOCURRENCY,
} = STORAGE;

const mobGetCurrenciesInfo = MobGetCurrenciesInfo.getInstance();
const globalStorage = GlobalStorage.getInstance();


export const Worker = class {
    constructor() {
        this._mobGetCurrenciesInfo_startRequest = true;
        this.mobGetCurrenciesInfo();
    }

    mobGetCurrenciesInfo() {
        const store = globalStorage.store();
        if (this._mobGetCurrenciesInfo_startRequest && !store[AMOUNTFEUDALCURRENCY].length && !store[AMOUNTCRYPTOCURRENCY].length) {
            this._mobGetCurrenciesInfo_startRequest = false;

            const
            successCallback = ({ data }) => {
                const { result } = JSON.parse(data);

                globalStorage.store({
                    [AMOUNTFEUDALCURRENCY]: result.filter(({ cur_id, volume }) => cur_id < 100 && volume === undefined),
                    [AMOUNTCRYPTOCURRENCY]: result.filter(({ cur_id }) => cur_id >= 100),
                });
            },
            failedCallback = () => {
                this._mobGetCurrenciesInfo_startRequest = true;
                this._mobGetCurrenciesInfo();
            };
            
            mobGetCurrenciesInfo.request().response({ successCallback, failedCallback });
        }
    }
};