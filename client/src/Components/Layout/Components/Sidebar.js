import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../../actions/profileActions';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logoutUser: PropTypes.func.isRequired
    };

    render() {
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

                {this.props.auth.isAuthenticated ? (
                    <Fragment>
                        <NavItem>
                            <NavLink to="/dashboard" className="nav-link" activeClassName="active">My Profile</NavLink>
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
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Sidebar);