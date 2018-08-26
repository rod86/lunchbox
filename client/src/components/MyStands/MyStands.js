import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import Tile from '../Global/Tile';
import { Table, Button } from 'reactstrap';
import { getProfileStands, deleteStand } from '../../actions/standsActions';
import Spinner from '../Global/Spinner';
import Moment from 'react-moment';
import classNames from 'classnames';

class MyStands extends Component {

    static propTypes = {
        stands: PropTypes.object.isRequired,
        getProfileStands: PropTypes.func.isRequired,
        deleteStand: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.onDeleteStand = this.onDeleteStand.bind(this);
    }

    componentDidMount() {
        this.props.getProfileStands();
    }

    onDeleteStand(id) {
        if (window.confirm('Are you sure to delete this stand?')) {
            this.props.deleteStand(id);
        }
    }

    renderStandsList() {
        const { stands } = this.props.stands;

        if (!stands.length) {
            return (
                <p className="lead text-muted text-center py-5">Your stands list is empty.</p>
            );
        }

        return (
            <Table className="vertical-align">
                <thead className="thead-primary">
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Active</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {stands.map(item => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>
                                <i className={classNames('fas fa fa-check-square', {
                                    'text-muted': !item.active,
                                    'text-success': item.active
                                })}></i>
                            </td>
                            <td>
                                <Moment format="DD/MM/YYYY HH:mm">{item.created_at}</Moment>
                            </td>
                            <td>
                                <Moment format="DD/MM/YYYY HH:mm">{item.updated_at}</Moment>
                            </td>
                            <td>
                                <Link to={`/panel/stands/edit/${item._id}`} className="btn btn-link">
                                    <i className="fas fa-pencil-alt mr-1"></i> Edit
                                </Link>
                                <Button color="link" onClick={() => this.onDeleteStand(item._id)}>
                                    <i className="fas fa-trash-alt mr-1"></i> Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
    
    render() {
        const { stands, loading } = this.props.stands;

        return (
            <AdminLayout>
                <h1>My Stands</h1>

                <Tile>
                    <div className="mb-3">
                        <Link to="/panel/stands/add" className="btn btn-success">
                            <i className="fas fa-plus mr-1"></i> Add Stand
                        </Link>
                    </div>
                    
                    {(loading || !stands) ? <Spinner /> : this.renderStandsList()}
                </Tile>
            </AdminLayout>
        )
    }
}

const mapStateToProps = state => ({
    stands: state.stands
});

export default connect(mapStateToProps, { getProfileStands, deleteStand })(MyStands);
