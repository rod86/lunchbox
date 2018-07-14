import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';

class AdminLayout extends Component {

    render() {
        return (
            <div className="footer-bottom">
                <Header />
                <main role="main">
                    {this.props.children}
                </main>
                <Footer />
            </div>
        );
    }
}

export default AdminLayout;