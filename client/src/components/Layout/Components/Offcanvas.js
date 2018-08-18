import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Offcanvas extends Component {
    
    static propTypes = {
        isOpen: PropTypes.bool,
        isSidebarColumn: PropTypes.bool,
        onToggleOffcanvas: PropTypes.func.isRequired
    };

    static defaultProps = {
        isOpen: false,
        isSidebarColumn: false
    };

    render() {
        return (
            <div className={classNames('offcanvas', {
                    'open': this.props.isOpen,
                    'sidebar-column': this.props.isSidebarColumn
                    })}>
                <div className="offcanvas-close">
                    <i className="fas fa-times fa-2x" onClick={this.props.onToggleOffcanvas}></i>
                </div>    
                {this.props.children}
            </div> 
        )
    }
}

export default Offcanvas;
