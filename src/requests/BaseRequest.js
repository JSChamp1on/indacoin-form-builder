// constants
import { XHR } from '../constants.json';
const {
    GET,
    POST,
    DONE,
    HEADERS_RECEIVED,
    LOADING,
    OPENED,
    UNSENT
} = XHR;

const DEVDOMAIN = 'https://indacoin.com';


export const BaseRequest = class {
    /**
     * initializing the XMLHttpRequest class
     * and creating a native request
     */
    constructor() {
        this.XHR = new XMLHttpRequest();
        this.xhr = ({ method, url, body, onReadyChange, onProgress }) => {
            this.XHR.open(method, url, true);
            this.XHR.setRequestHeader('x-requested-with', 'XMLHttpRequest');
            this.XHR.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            this.XHR.onprogress = onProgress;
            this.XHR.onreadystatechange = onReadyChange;
            this.XHR.send(body);
        };
    }

    /**
     * listening readyState and status
     */
    _onReadyChange({ progressEvent: { target, srcElement }, onReadyChange, resolve, reject }) {
        const xhr = target || srcElement;
        const { readyState, status, response } = xhr;

        if (typeof onReadyChange === 'function') {
            onReadyChange({
                readyState: (() => {
                    switch (readyState) {
                        case this.XHR.DONE: return DONE;
                        case this.XHR.HEADERS_RECEIVED: return HEADERS_RECEIVED;
                        case this.XHR.LOADING: return LOADING;
                        case this.XHR.OPENED: return OPENED;
                        case this.XHR.UNSENT: return UNSENT;
                    }
                })(),
                status,
            });
        }

        if (readyState === xhr.DONE) {
            if (status === 200) {
                resolve({
                    data: response,
                });
            } else {
                reject({
                    data: response,
                    status,
                });
            }
        }
    }

    /**
     * listening download response
     */
    _onProgress({ progressEvent: { total, loaded }, onProgress }) {
        if (typeof onProgress === 'function') {
            onProgress({
                percent: Math.round(total / loaded * 100),
                byte: loaded,
            });
        }
    }

    /**
     * ==== GET QUERY ====
     * 
     * url // pathname
     * onReadyChange // server connection process
     * onProgress // loading indicator
     */
    get({ url, onReadyChange, onProgress }) {
        if (this.XHR.readyState !== this.XHR.DONE && this.XHR.readyState !== this.XHR.UNSENT) {
            this.XHR.abort();
        }
        
        return new Promise((resolve, reject) => {
            this.xhr({
                method: GET,
                url: /^http(s)/.test(url) ? url : DEVDOMAIN + url,
                onReadyChange: progressEvent => this._onReadyChange({ progressEvent, onReadyChange, resolve, reject }),
                onProgress: progressEvent => this._onProgress({ progressEvent, onProgress }),
            });
        });
    }

    /**
     * ==== POST QUERY ====
     * 
     * url // pathname
     * body // request body
     * onReadyChange // server connection process
     * onProgress // loading indicator
     */
    post({ url, body, onReadyChange, onProgress }) {
        // kill pending request
        if (this.XHR.readyState !== this.XHR.DONE && this.XHR.readyState !== this.XHR.UNSENT) {
            this.XHR.abort();
        }
        
        return new Promise((resolve, reject) => {
            this.xhr({
                method: POST,
                url: /^http(s)/.test(url) ? url : DEVDOMAIN + url,
                body,
                onReadyChange: progressEvent => this._onReadyChange({ progressEvent, onReadyChange, resolve, reject }),
                onProgress: progressEvent => this._onProgress({ progressEvent, onProgress }),
            });
        });
    }
};