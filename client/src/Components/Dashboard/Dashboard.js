import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import AdminLayout from '../Layout/AdminLayout';

const Dashboard = () => (
    <AdminLayout>
        <Container>
            <Row>
                <Col>
                    <h1>Dashboard</h1>
                    <p>private page</p>
                </Col> 
            </Row>    
        </Container> 
    </AdminLayout>       
);

export default Dashboard;