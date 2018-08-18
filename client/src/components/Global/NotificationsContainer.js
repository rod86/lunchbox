import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';

class NotificationsContainer extends Component {

    static propTypes = {
        notifications: PropTypes.array
    }

    render() {
        const { notifications } = this.props;

        return (
            <Notifications 
                notifications={notifications}
                />
        )    
    }
}

const mapStateToProps = state => ({
    notifications: state.notifications
});

export default connect(mapStateToProps)(NotificationsContainer);
