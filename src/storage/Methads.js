export const Methods = class {
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
            this.callbacks.push(callback);
            callback(this.state);
        } else {
            console.error('this callback is not function');
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