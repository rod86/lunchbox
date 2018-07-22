import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

const UserMenu = ({ username }) => {
    return (
        <Nav navbar className="d-none d-md-block ml-md-3">
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    {username}
                </DropdownToggle>
                <DropdownMenu>
                    <Link to="/dashboard" className="dropdown-item">
                        My Profile
                    </Link>  
                    <Link to="/logout" className="dropdown-item">
                        Logout
                    </Link>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav> 
    )
}

UserMenu.propTypes = {
    username: PropTypes.string.isRequired
};

export default UserMenu;