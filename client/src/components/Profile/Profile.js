import React from 'react';
import { Row, Col } from 'reactstrap';
import AdminLayout from '../Layout/AdminLayout';
import ProfileDetails from './ProfileDetails';
import ProfileChangePassword from './ProfileChangePassword';
import ProfileDelete from './ProfileDelete';

const Profile = () => (
    <AdminLayout>
        <h1>My Profile</h1>

        <Row>
            <Col md={{ size: 6, order: 2 }} lg={{ size: 4 }}>
                <ProfileDetails />
            </Col>
            <Col md={{ size: 6, order: 1 }} lg={{ size: 8 }}>
                <ProfileChangePassword />
                <ProfileDelete />
            </Col>
        </Row>
    </AdminLayout>       
);

export default Profile;