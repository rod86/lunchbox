import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <Nav vertical>
            <NavItem>
                <Link to="/dashboard" className="nav-link">
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                </Link>
            </NavItem>  
            <NavItem className="active">
                <Link to="/" className="nav-link">
                    <i className="fas fa-map-marker"></i> My Stands
                </Link>
            </NavItem> 
            <NavItem>
                <Link to="/" className="nav-link">
                    <i className="fas fa-user"></i> Profile
                </Link>
            </NavItem>   
        </Nav>
    )
}