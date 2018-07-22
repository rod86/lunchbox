import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Offcanvas from './Components/Offcanvas';
import DashboardSidebar from './Components/DashboardSidebar';

class AdminLayout extends Component {

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
            <div id="admin-page" className="footer-bottom">
                <Header onToggleOffcanvas={this.toggleOffcanvas} />
                <Container fluid className="main-content">
                    <Row noGutters>
                        <Offcanvas isOpen={this.state.isOffcanvasOpen} onToggleOffcanvas={this.toggleOffcanvas} isSidebarColumn>
                            <DashboardSidebar />
                        </Offcanvas>
                        
                        <main className="col-md-9 col-lg-2 offset-md-3 offset-lg-2">
                            main content
                        </main>
                    </Row>    
                </Container>
                <Footer />
            </div>
        );
    }
}

export default AdminLayout;