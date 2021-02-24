import React, { Component, createRef } from 'react';

// styles
import styles from './styles.scss';


const Dropdown = class extends Component {
    constructor() {
        super();

        this.state = {
            height: 0,
        };

        this.refMenu = createRef();

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.scrollHeight();
        this.mousedownListener();
    }

    componentDidUpdate() {
        this.scrollHeight();
    }

    componentWillUnmount() {
        this.mousedownListener(false);
    }

    scrollHeight() {
        const { set } = this.props.useShow;

        const height = set ? this.refMenu.current.scrollHeight : 0;
        
        if (this.state.height !== height) {
            this.setState({ height });
        }
    }

    handleClick(e) {
        const { get } = this.props.useShow;

        if (e.path[0].tagName !== 'BUTTON' && !e.path.some(item => item.tagName && this.refMenu.current.contains(item))) {
            if (typeof get === 'function') {
                get(false);
            }
        }
    }

    mousedownListener(listener = true) {
        if (listener) {
            document.addEventListener('mousedown', this.handleClick);
        } else {
            document.removeEventListener('mousedown', this.handleClick);
        }
    }

    render() {
        const 
        {
            items = [],
            render = item => JSON.stringify(item),
            selected = (item, index) => console.log(item, index),
            positionMenu,
            maxHeight,
        } = this.props,
        {
            height,
        } = this.state;

        const onClick = (item, index) => {
            if (typeof selected === 'function') {
                selected(item, index);
            }
        };

        return (
            <div className={styles.wrapper}>
                <menu
                    ref={this.refMenu}
                    style={{
                        height: height ? maxHeight || height : 0,
                        [positionMenu]: 0,
                    }}
                >
                    {
                        items.map((item, index) => <li
                            key={index}
                            onClick={onClick}
                        >{ render(item, index) }</li>)
                    }
                </menu>
            </div>
        );
    }
};

export {
    Dropdown,
};