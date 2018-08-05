import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import Tile from '../Global/Tile';
import { deleteProfile } from '../../actions/profileActions';
import CheckboxSwitch from '../Global/CheckboxSwitch';

class ProfileDelete extends Component {

    static propTypes = {
        deleteProfile: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isConfirmChecked: false
        };

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onConfirmChange = this.onConfirmChange.bind(this);
    }

    onConfirmChange(checked) {
        this.setState({ isConfirmChecked: checked });
    }

    onDeleteClick(e) {
        e.preventDefault();
        this.props.deleteProfile(this.props.history);
    }

    render() {
        const { error } = this.props;

        return (
            <Tile header="Delete Account">
                {error.description?(
                    <Alert color="danger">{error.description}</Alert>
                ):''}

                <p>
                    This will delete the account with all related data and it cannot be undone.
                </p>

               <CheckboxSwitch id="confirm-delete" onChange={this.onConfirmChange} checked={this.state.isConfirmChecked}>
                    I confirm I want to delete my account.
               </CheckboxSwitch>
                
                <div className="text-right">
                    <Button color="danger" disabled={!this.state.isConfirmChecked} onClick={this.onDeleteClick}>Delete my account</Button>
                </div>
            </Tile> 
        )
    }
}

const mapStateToProps = state => ({
    error: state.error
});

export default connect(mapStateToProps, { deleteProfile })(withRouter(ProfileDelete));