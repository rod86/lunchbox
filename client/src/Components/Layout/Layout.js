import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Offcanvas from './Components/Offcanvas';
import Sidebar from './Components/Sidebar';

class Layout extends Component {

    static propTypes = {
        footerBottom: PropTypes.bool,
        id: PropTypes.string
    };

    static defaultProps = {
        footerBottom: true
    }

    constructor(props) {
        super(props);

        this.state = { isOffcanvasOpen: false };
        this.toggleOffcanvas = this.toggleOffcanvas.bind(this);
    }

    toggleOffcanvas() {
        this.setState({ isOffcanvasOpen: !this.state.isOffcanvasOpen });
    }

    render() {
        const id = (typeof this.props.id !== 'undefined') ? this.props.id : null;
        const footerBottom = (typeof this.props.footerBottom !== 'undefined') ? this.props.footerBottom : true;

        return (
            <div id={id} className={classNames({ 'footer-bottom': footerBottom })}>
                <Header onToggleOffcanvas={this.toggleOffcanvas} />
                <Offcanvas isOpen={this.state.isOffcanvasOpen} onToggleOffcanvas={this.toggleOffcanvas}>
                    <Sidebar />
                </Offcanvas>  
                <main role="main" className="main-content">
                    {this.props.children}
                </main>
                <Footer />
            </div>
        );
    }
}

export default Layout;