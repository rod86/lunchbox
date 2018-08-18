import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const SidebarNav = ({ isAuthenticated }) => {
    return (
        <Nav vertical>
            <NavItem>
                <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
            </NavItem>  
            <NavItem>
                <NavLink to="/search" className="nav-link" activeClassName="active">Search</NavLink>
            </NavItem>  
            <NavItem>
                <NavLink to="/About" className="nav-link" activeClassName="active">About</NavLink>
            </NavItem> 

            {isAuthenticated ? (
                <Fragment>
                    <NavItem>
                        <NavLink to="/panel" className="nav-link" activeClassName="active">My Panel</NavLink>
                    </NavItem>   
                    <NavItem>
                        <NavLink to="/logout" className="nav-link" activeClassName="active">Logout</NavLink>
                    </NavItem>
                </Fragment> 
            ) : (
                <Fragment>
                    <NavItem>
                        <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
                    </NavItem>   
                    <NavItem>
                        <NavLink to="/signup" className="nav-link" activeClassName="active">Signup</NavLink>
                    </NavItem> 
                </Fragment>
            )}
        </Nav>
    );
};

SidebarNav.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

export default SidebarNav;