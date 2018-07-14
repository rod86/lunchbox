import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Header from './Components/Header';
import Footer from './Components/Footer';

class Layout extends Component {
    render() {
        const id = (typeof this.props.id !== 'undefined') ? this.props.id : null;
        const footerBottom = (typeof this.props.footerBottom !== 'undefined') ? this.props.footerBottom : true;

        return (
            <div id={id} className={classnames({ 'footer-bottom': footerBottom })}>
                <Header />
                <main role="main">
                    {this.props.children}
                </main>
                <Footer />
            </div>
        );
    }
}

Layout.propTypes = {
    footerBottom: PropTypes.bool,
    id: PropTypes.string
};

Layout.defaultProps = {
    footerBottom: true
}

export default Layout;