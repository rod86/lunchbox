import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Container, Navbar, NavbarToggler, Collapse, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { logoutUser } from '../../../actions/profileActions';

import logo from '../../../images/logo.png';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = { isNavbarOpen: false };

        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar() {
        this.setState({ isNavbarOpen: !this.state.isNavbarOpen });
    }

    renderGuestNav() {
        return (
            <Nav navbar className="ml-auto">
                <NavItem>
                    <NavLink to="/search" className="nav-link" activeClassName="active">Search</NavLink>
                </NavItem>    
                <NavItem>
                    <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
                </NavItem> 
                <NavItem>
                    <NavLink to="/signup" className="nav-link" activeClassName="active">Sign Up</NavLink>
                </NavItem> 
            </Nav>   
        )
    }

    renderAuthNav() {
        return (
            <Nav navbar className="ml-auto">
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    <i className="fas fa-user text-white mr-1"></i> {this.props.auth.user.username}
                    </DropdownToggle>
                    <DropdownMenu>
                        <Link to="/dashboard" className="dropdown-item">
                            My Profile
                        </Link>  
                        <DropdownItem onClick={this.props.logoutUser}>
                            Logout
                        </DropdownItem> 
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav> 
        )
    }

    render() {
        return (
            <header>
                <Navbar dark className="bg-primary" expand="md">
                    <Container>
                        <Link to="/" className="navbar-brand">
                            <img src={logo} alt="Lunch Box" />
                        </Link>
                        <NavbarToggler onClick={this.toggleNavbar} />
                        <Collapse isOpen={this.state.isNavbarOpen} navbar>
                             {this.props.auth.isAuthenticated ? this.renderAuthNav() : this.renderGuestNav()}
                        </Collapse>
                    </Container>
                </Navbar>
            </header>    
        )
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);