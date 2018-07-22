import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Offcanvas from './Components/Offcanvas';
import Sidebar from './Components/Sidebar';

class LoginLayout extends Component {
    
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
                <Header onToggleOffcanvas={this.toggleOffcanvas} />
                <Offcanvas isOpen={this.state.isOffcanvasOpen} onToggleOffcanvas={this.toggleOffcanvas}>
                    <Sidebar />
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

export default LoginLayout;