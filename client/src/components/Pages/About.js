import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Layout from '../Layout/Layout';

const About = () => (
    <Layout>
        <Container>
            <Row>
                <Col>
                    <h1>About Lunch Box</h1>
                    <p>Browse and find meals close to your workplace</p>
                </Col> 
            </Row>    
        </Container> 
    </Layout>       
);

export default About;