import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Offcanvas from './Components/Offcanvas';
import SidebarNav from './Nav/SidebarNav';
import AccountInfo from './Components/AccountInfo';
import MainNav from './Nav/MainNav';

class Layout extends Component {

    static propTypes = {
        footerBottom: PropTypes.bool,
        id: PropTypes.string,
        auth: PropTypes.object.isRequired
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
                <Header onToggleOffcanvas={this.toggleOffcanvas}>
                    <MainNav isAuthenticated={this.props.auth.isAuthenticated} />    
                    {this.props.auth.isAuthenticated ? (<AccountInfo username={this.props.auth.user.username} />) : ''}  
                </Header>
                <Offcanvas isOpen={this.state.isOffcanvasOpen} onToggleOffcanvas={this.toggleOffcanvas}>
                    <SidebarNav isAuthenticated={this.props.auth.isAuthenticated} />
                </Offcanvas>  
                <main role="main" className="main-content">
                    {this.props.children}
                </main>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Layout);