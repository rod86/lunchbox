import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Offcanvas from './Components/Offcanvas';
import SidebarNav from './Nav/SidebarNav';
import AccountInfo from './Components/AccountInfo';
import MainNav from './Nav/MainNav';

class LoginLayout extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    
    constructor(props) {
        super(props);

        this.state = { isOffcanvasOpen: false };
        this.toggleOffcanvas = this.toggleOffcanvas.bind(this);
    }

    toggleOffcanvas() {
        this.setState({ isOffcanvasOpen: !this.state.isOffcanvasOpen });
    }

    render() {
        return (
            <div id="login-page" className="footer-bottom">
                <Header onToggleOffcanvas={this.toggleOffcanvas}>
                    <MainNav isAuthenticated={this.props.auth.isAuthenticated} />    
                    {this.props.auth.isAuthenticated ? (<AccountInfo username={this.props.auth.user.username} />) : ''}  
                </Header>
                <Offcanvas isOpen={this.state.isOffcanvasOpen} onToggleOffcanvas={this.toggleOffcanvas}>
                    <SidebarNav isAuthenticated={this.props.auth.isAuthenticated} />
                </Offcanvas>   
                <main role="main" className="main-content"> 
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="content-center">
                            {this.props.children}
                        </div>
                    </div>
                </main>
                <Footer />
            </div> 
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(LoginLayout);