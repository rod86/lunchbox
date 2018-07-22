import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Container, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { logoutUser } from '../../../actions/profileActions';
import UserMenu from './UserMenu';

import logo from '../../../images/logo.png';

class Header extends Component {
    
    static propTypes = {
        auth: PropTypes.object.isRequired,
        onToggleOffcanvas: PropTypes.func.isRequired
    };

    render() {
        return (
            <header>
                <Navbar dark className="bg-primary" expand="md">
                    <Container>
                        <Link to="/" className="navbar-brand">
                            <img src={logo} alt="Lunch Box" />
                        </Link>
                        <NavbarToggler onClick={this.props.onToggleOffcanvas} />
                        
                        <Nav navbar className="ml-auto d-none d-md-flex">
                            <NavItem>
                                <NavLink to="/search" className="nav-link" activeClassName="active">Search</NavLink>
                            </NavItem>    
                            <NavItem>
                                <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
                            </NavItem> 
                            
                            {!this.props.auth.isAuthenticated ? (
                                <Fragment>
                                    <NavItem>
                                        <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
                                    </NavItem> 
                                    <NavItem>
                                        <NavLink to="/signup" className="nav-link" activeClassName="active">Sign Up</NavLink>
                                    </NavItem>
                                </Fragment>
                                ) : ''}    
                        </Nav>   
                        {this.props.auth.isAuthenticated ? (<UserMenu username={this.props.auth.user.username} />) : ''}    
                    </Container>
                </Navbar>
            </header>    
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);