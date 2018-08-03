import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import Tile from '../Global/Tile';
import { deleteProfile } from '../../actions/profileActions';

class ProfileDelete extends Component {

    static propTypes = {
        deleteProfile: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.onDeleteProfile = this.onDeleteProfile.bind(this);
    }

    onDeleteProfile(e) {
        this.props.deleteProfile(this.props.history);
    }

    render() {
        const { error } = this.props;

        return (
            <Tile header="Delete Account">

                {error.description?(
                    <Alert color="danger">{error.description}</Alert>
                ):''}

                <p>This will delete the account with all related data.</p>
                <div className="text-right">
                    <Button color="danger" onClick={this.onDeleteProfile}>Delete my account</Button>
                </div>
            </Tile> 
        )
    }
}

const mapStateToProps = state => ({
    error: state.error
});

export default connect(mapStateToProps, { deleteProfile })(withRouter(ProfileDelete));