import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Navbar, NavbarToggler } from 'reactstrap';

import logo from '../../../assets/images/logo.png';

class Header extends Component {
    
    static propTypes = {
        onToggleOffcanvas: PropTypes.func
    };

    static defaultProps = {
        onToggleOffcanvas: null
    };

    render() {
        return (
            <header>
                <Navbar dark className="bg-primary" expand="md">
                    <Container>
                        <Link to="/" className="navbar-brand">
                            <img src={logo} alt="Lunch Box" />
                        </Link>
                        {this.props.onToggleOffcanvas ? <NavbarToggler onClick={this.props.onToggleOffcanvas} /> : ''}
                        {this.props.children}  
                    </Container>
                </Navbar>
            </header>    
        )
    }
}

export default Header;