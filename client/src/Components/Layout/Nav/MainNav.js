import React, { Fragment } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MainNav = ({ isAuthenticated }) => {
    return (
        <Nav navbar className="ml-auto d-none d-md-flex">
            <NavItem>
                <NavLink to="/search" className="nav-link" activeClassName="active">Search</NavLink>
            </NavItem>    
            <NavItem>
                <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
            </NavItem> 
            
            {!isAuthenticated ? (
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
    )
}

MainNav.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

export default MainNav;