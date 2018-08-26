import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import Tile from '../Global/Tile';
import StandForm from './StandForm';
import { createStand } from '../../actions/standsActions';

class AddStand extends Component {

    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(formValues) {
        this.props.createStand(formValues, this.props.history);
    }
    
    render() {
        return (
            <AdminLayout>
                <h1>Add Stand</h1>

                <Tile>
                   <StandForm onSubmit={this.onFormSubmit} />
                </Tile>
            </AdminLayout>
        )
    }
}

export default connect(null, { createStand })(withRouter(AddStand));