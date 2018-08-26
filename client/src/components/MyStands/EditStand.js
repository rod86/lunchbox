import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import Tile from '../Global/Tile';
import Spinner from '../Global/Spinner';
import AdminErrorMessage from '../Global/AdminErrorMessage';
import StandForm from './StandForm';
import { getStand, updateStand } from '../../actions/standsActions';

class EditStand extends Component {

    static propTypes = {
        getStand: PropTypes.func.isRequired,
        updateStand: PropTypes.func.isRequired,
        stands: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {;
        this.props.getStand(this.props.match.params.id);
    }

    onFormSubmit(formValues) {
        this.props.updateStand(this.props.match.params.id, formValues, this.props.history);
    }
    
    render() {
        const { stand, loading } = this.props.stands;

        if (!loading && stand && this.props.auth.user.id != stand.user._id) {
            return (
                <AdminErrorMessage>
                    You are not authorized to view this page
                </AdminErrorMessage>
            );
        }

        return (
            <AdminLayout>
                <h1>Edit Stand</h1>

                <Tile>
                    {(loading || !stand) ? <Spinner /> : (
                        <StandForm 
                            onSubmit={this.onFormSubmit} 
                            formValues={{
                                name: stand.name,
                                description: stand.description,
                                address: stand.address,
                                latitude: stand.location.coordinates[1],
                                longitude: stand.location.coordinates[0],
                                active: stand.active  
                            }} />
                    )}
                </Tile>
            </AdminLayout>
        )
    }
}

const mapStateToProps = state => ({
    stands: state.stands,
    auth: state.auth
});


export default connect(mapStateToProps, { getStand, updateStand })(withRouter(EditStand));

