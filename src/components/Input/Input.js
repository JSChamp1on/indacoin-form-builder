import React, { Component, createRef } from "react";

// styles
import styles from './styles.scss';
import triangle from '../../assets/images/triangle.svg'

// components
import { Dropdown } from '../Dropdown';

// constants
import { OPTIONS } from "../../constants.json";
const {
    POSITIONMENULEFT,
    POSITIONMENURIGHT,
} = OPTIONS;


const Input = class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showList: false,
        };

        this.positionMenu = props.positionMenu;

        this.input = createRef();
    }

    renderDdropdown() {
        const 
        {
            items,
            render,
            selected,
            maxHeight,
        } = this.props,
        {
            showList,
        } = this.state;

        const selectedAndCloseMenu = (item, index) => {
            this.setState({ showList: false });

            if (typeof selected === 'function') {
                selected(item, index);
            }
        };

        return <>
            <button 
                type={'button'}
                style={{
                    width: 100,
                    borderRadius: (
                        this.positionMenu === POSITIONMENULEFT
                        && `22px 0 0 ${showList ? 0 : 22}px`
                        || this.positionMenu === POSITIONMENURIGHT
                        && `0 22px ${showList ? 0 : 22}px 0`
                        || '22px'
                    ),
                    background: (
                        this.positionMenu === POSITIONMENULEFT
                        ? (
                            showList
                            ? `#f7f9fa url(${triangle}) left 15px bottom 10px no-repeat`
                            : `#efefef url(${triangle}) left 15px center no-repeat`
                        )
                        : (
                            showList
                            ? `#f7f9fa url(${triangle}) right 15px bottom 10px no-repeat`
                            : `#efefef url(${triangle}) right 15px center no-repeat`
                        )
                    ),
                    padding: (
                        this.positionMenu === POSITIONMENULEFT
                        ? '0 6px 0 26px'
                        : '0 26px 0 6px'
                    ),
                }}
                onClick={() => this.setState({ showList: !showList })}
            >USD</button>
            <Dropdown
                useShow={{
                    set: showList,
                    get: showList => this.setState({ showList }),
                }}
                items={items}
                render={render}
                selected={selectedAndCloseMenu}
                positionMenu={
                    this.positionMenu === POSITIONMENURIGHT
                    ? 'right'
                    : 'left'
                }
                maxHeight={maxHeight}
            />
        </>;
    }

    renderInput() {
        return <>
            <input
                ref={this.input}
                type={'text'}
                style={{
                    width: (
                        (
                            this.positionMenu === POSITIONMENULEFT
                            || this.positionMenu === POSITIONMENURIGHT
                        )
                        ? 'calc(100% - 100px)'
                        : '100%'
                    ),
                    borderRadius: (
                        this.positionMenu === POSITIONMENULEFT
                        && '0 22px 22px 0'
                        || this.positionMenu === POSITIONMENURIGHT
                        && '22px 0 0 22px'
                        || '22px'
                    ),
                }}
            />
            <label 
                style={{
                    left: (
                        this.positionMenu === POSITIONMENULEFT
                        ? '120px'
                        : '20px'
                    ),
                }}
                onClick={() => this.input.current.focus()}
            >label</label>
        </>;
    }

    render() {
        const {
            error,
        } = this.props;

        return (
            <div className={styles.wrapper}>
                <div className={styles.enter}>
                    {
                        this.positionMenu === POSITIONMENULEFT
                        && this.renderDdropdown()
                    }
                    { this.renderInput() }
                    {
                        this.positionMenu === POSITIONMENURIGHT
                        && this.renderDdropdown()
                    }
                </div>
                { error && <span>{ error }</span> }
            </div>
        );
    }
};

export {
    Input,
};