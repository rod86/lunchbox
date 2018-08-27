import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default () => {
    return (
        <Nav vertical>
            <NavItem>
                <NavLink exact to="/panel" className="nav-link">
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                </NavLink>
            </NavItem> 
            <NavItem>
                <NavLink to="/panel/stands" className="nav-link">
                    <i className="fas fa-map-marker"></i> My Stands
                </NavLink>
            </NavItem> 
            <NavItem>
                <NavLink to="/panel/profile" className="nav-link">
                    <i className="fas fa-user"></i> My Profile
                </NavLink>
            </NavItem>   
            <NavItem>
                <NavLink to="/logout" className="nav-link">
                    <i className="fas fa-power-off"></i> Logout
                </NavLink>
            </NavItem>
        </Nav>
    )
}