// requests
import { MobGetCurrenciesInfo, GetCoinConvertAmount } from '@requests';

// storage
import { GlobalStorage } from '@storage';

// constants
import { STORAGE, XHR } from '../../constants.json';

const 
{
    AMOUNTVALUEIN,
    AMOUNTVALUECRYPTO,
    AMOUNTFIATCURRENCY,
    AMOUNTCRYPTOCURRENCY,
    AMOUNTCURRENCYFIAT,
    AMOUNTCURRENCYCRYPTO,
} = STORAGE,
{
    DONE,
    HEADERS_RECEIVED,
    LOADING,
    OPENED,
    UNSENT
} = XHR;

const 
mobGetCurrenciesInfo = MobGetCurrenciesInfo.getInstance(),
getCoinConvertAmount = GetCoinConvertAmount.getInstance();
const globalStorage = GlobalStorage.getInstance();

export const Worker = class {
    mobGetCurrenciesInfo() {
        const store = globalStorage.store();

        if (!store[AMOUNTFIATCURRENCY].length && !store[AMOUNTCRYPTOCURRENCY].length) {
            const successCallback = ({ data }) => {
                const { result } = JSON.parse(data);

                globalStorage.store({
                    [AMOUNTFIATCURRENCY]: result.filter(({ cur_id, volume }) => cur_id < 100 && volume === undefined),
                    [AMOUNTCRYPTOCURRENCY]: result.filter(({ cur_id }) => cur_id >= 100),
                });
            };
            
            mobGetCurrenciesInfo.request().response({ successCallback, failedCallback: this.mobGetCurrenciesInfo });
        }
    }

    getCoinConvertAmount({ partner } = {}) {
        const store = globalStorage.store();
        const req = {
            currencyIn: store[AMOUNTCURRENCYFIAT],
            currencyOut: store[AMOUNTCURRENCYCRYPTO],
            amount: store[AMOUNTVALUEIN],
        };

        if (partner) {
            req.partner = partner;
        }

        const successCallback = ({ data }) => {
            globalStorage.store({
                [AMOUNTVALUECRYPTO]: data == 0 ? '' : data,
            });
        };

        getCoinConvertAmount.request(req).response({ successCallback });
    }
};