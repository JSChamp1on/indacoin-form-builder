import React, { Component, createRef } from "react";

// styles
import styles from './design.scss';

// constants
import { PHONE } from "../../constants.json";


const {
    IS_POSSIBLE,
    IS_POSSIBLE_LOCAL_ONLY,
    TOO_SHORT,
} = PHONE;

const Design = class extends Component {
    constructor() {
        super();

        this.input = createRef();
    }

    componentDidMount() {}

    render() {
        return (
            <div className={styles.wrapper}>
                <input
                    ref={this.input}
                    type={'text'}
                />
                <label onClick={() => {
                    this.input.current.focus();
                }}>
                    label
                </label>
                <span>Error</span>
            </div>
        );
    }
};

export {
    Design,
};