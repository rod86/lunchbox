import React from 'react';
import { Row, Col } from 'reactstrap';
import AdminLayout from '../../Layout/AdminLayout';
import Tile from '../../Global/Tile';
import ProfileDetails from './ProfileDetails';

const Profile = () => (
    <AdminLayout>
        <h1>My Profile</h1>

        <Row>
            <Col md={{ size: 6, order: 2 }} lg={{ size: 4 }}>
                <ProfileDetails />
            </Col>
            <Col md={{ size: 6, order: 1 }} lg={{ size: 8 }}>
                <Tile header="Change Password">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Old Password</label>
                            <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail13">New Password</label>
                            <input type="password" className="form-control" id="exampleInputEmail13" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail14">Confirm Password</label>
                            <input type="password" className="form-control" id="exampleInputEmail14" aria-describedby="emailHelp" />
                        </div>
                        <div className="text-right">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </Tile>
                <Tile header="Delete Account">
                    <p>This will delete the account with all related data.</p>
                    <div className="text-right">
                        <button type="submit" className="btn btn-danger pull-right">Delete my account</button>
                    </div>
                </Tile> 
            </Col>
        </Row>
    </AdminLayout>       
);

export default Profile;