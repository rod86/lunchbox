import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Offcanvas from './Components/Offcanvas';
import AccountInfo from './Components/AccountInfo';
import PanelNav from './Nav/PanelNav';
import NotificationsContainer from '../Global/NotificationsContainer';

class AdminLayout extends Component {

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
            <div id="admin-page" className="footer-bottom">
                <NotificationsContainer />
                <Header onToggleOffcanvas={this.toggleOffcanvas}>
                    {this.props.auth.isAuthenticated ? (<AccountInfo username={this.props.auth.user.username} />) : ''}  
                </Header>
                <Container fluid className="main-content">
                    <Row noGutters>
                        <Offcanvas isOpen={this.state.isOffcanvasOpen} onToggleOffcanvas={this.toggleOffcanvas} isSidebarColumn>
                            <PanelNav />
                        </Offcanvas>
                        
                        <main className="col-md-9 col-lg-10 offset-md-3 offset-lg-2">
                            {this.props.children}
                        </main>
                    </Row>    
                </Container>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdminLayout);