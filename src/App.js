import React, { Component } from 'react';
import { Storage } from './Storage';

// components
import { Worker, Design } from './components/Phone';

const storage = Storage.getInstance();

const App = class extends Component {
    constructor() {
        super();

        storage.subscription = data => console.log(data);

        window.worker = new Worker();
    }

    render() {
        return <>
            <Design/>
        </>;
    }
};

export default App;
export {
    storage,
}