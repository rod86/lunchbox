import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../../actions/profileActions';

class Logout extends Component {

    static propTypes = {
        logoutUser: PropTypes.func.isRequired
    };


    componentDidMount() {
        this.props.logoutUser();
    }

    render () {
        return (
            <Redirect to="/login" />
        );
    }
}

export default connect(null, { logoutUser })(Logout);