import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Layout from '../Layout/Layout';

const NotFound = () => (
    <Layout>
        <Container>
            <Row>
                <Col>
                    <h1>Page Not Found</h1>
                    <p>The page you requested was not found.</p>
                </Col> 
            </Row>    
        </Container> 
    </Layout>       
);

export default NotFound;