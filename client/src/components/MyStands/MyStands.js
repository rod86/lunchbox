import React, { Component } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import Tile from '../Global/Tile';
import { Table, Button } from 'reactstrap';

class MyStands extends Component {
    
    render() {
        const items = Array.from(Array(20).keys());

        return (
            <AdminLayout>
                <h1>My Stands</h1>

                <Tile>
                    <div className="mb-3">
                        <Button color="primary">
                            <i className="fas fa-plus mr-1"></i> Add Stand
                        </Button>
                    </div>
                    <Table className="vertical-align">
                        <thead className="thead-primary">
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(() => (
                                    <tr>
                                        <td>Top Kebabs</td>
                                        <td>Shoreditch</td>
                                        <td><span className="text-success">Active</span></td>
                                        <td>11/11/1111 11:11</td>
                                        <td>11/11/1111 11:11</td>
                                        <td>
                                            <Button color="link">
                                                <i className="fas fa-pencil-alt mr-1"></i> Edit
                                            </Button>
                                            <Button color="link" >
                                                <i className="fas fa-trash-alt mr-1"></i> Delete
                                            </Button>
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tile>
            </AdminLayout>
        )
    }
}

export default MyStands;
