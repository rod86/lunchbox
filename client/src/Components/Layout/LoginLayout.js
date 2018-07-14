import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';

class LoginLayout extends Component {
    render() {
        return (
            <div id="login-page" className="footer-bottom">
                <Header />
                <main role="main">
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