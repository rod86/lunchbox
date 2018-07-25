import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default () => {
    return (
        <Nav vertical>
            <NavItem>
                <NavLink exact to="/" className="nav-link">
                    <i className="fas fa-home"></i> Home
                </NavLink>
            </NavItem> 
            <NavItem>
                <NavLink exact to="/useradmin" className="nav-link">
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                </NavLink>
            </NavItem> 
            <NavItem>
                <NavLink to="/useradmin/stands" className="nav-link">
                    <i className="fas fa-map-marker"></i> Stands
                </NavLink>
            </NavItem> 
            <NavItem>
                <NavLink to="/useradmin/profile" className="nav-link">
                    <i className="fas fa-user"></i> My Profile
                </NavLink>
            </NavItem>   
            <NavItem>
                <NavLink to="/logout" className="nav-link">
                    <i className="fas fa-sign-out-alt"></i> Logout
                </NavLink>
            </NavItem>
        </Nav>
    )
}