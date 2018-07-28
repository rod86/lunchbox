import React from 'react';
import { Row, Col } from 'reactstrap';
import AdminLayout from '../../Layout/AdminLayout';
import IconBox from './IconBox';

const Dashboard = () => (
    <AdminLayout>
        <Row>
            <Col>
                <h1>Dashboard</h1>

                <Row>
                    <IconBox title="Stands" icon="fa-map-marker" color="success" url="/panel/stands" />
                    <IconBox title="My Profile" icon="fa-user" color="info" url="/panel/profile" />
                </Row> 
            </Col> 
        </Row> 
    </AdminLayout>       
);

export default Dashboard;