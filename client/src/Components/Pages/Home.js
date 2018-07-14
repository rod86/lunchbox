import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Layout from '../Layout/Layout';

import joinImage from '../../images/food-truck.jpg';

const Home = () => {
    return (
        <Layout id="homepage" footerBottom={false}>
            <div>
                <section id="hero-image">
                    <div className="overlay"></div>
                    <Container>
                        <Row>
                            <Col xs="12" md="10" className="mx-auto text-center hero-text">
                                <h1 className="mb-4 text-light font-weight-light">Find lunch ideas next to your workplace</h1>
                                <Link to="/search" className="btn btn-outline-light btn-lg">Search</Link>
                            </Col>
                        </Row>     
                    </Container>
                </section>

                <section id="icon-boxes">
                    <Container>
                        <Row>
                            <Col md="4" className="text-center">
                                <i className="fa fa-map-marker fa-3x text-primary"></i>
                                <h3>Explore</h3>
                                <p>Find places close to your workplace.</p>
                            </Col>
                            <Col md="4" className="text-center">
                                <i className="fa fa-utensils fa-3x text-primary"></i>
                                <h3>Eat</h3>
                                <p>Eat well and healthy everyday.</p>
                            </Col>
                            <Col md="4" className="text-center">
                                <i className="fa fa-share-alt fa-3x text-primary"></i>
                                <h3>Share</h3>
                                <p>Tell your mates how well yo eat.</p>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section id="join-stand">
                    <Container>
                        <Row>
                            <Col md="6" className="align-self-center text">
                                <h3>Join Lunch Box</h3>
                                <p>
                                    Do you have a stand and you want to be found? Join Lunch Box. It's free.
                                </p>
                                <Link to="/signup" className="btn btn-outline-primary btn-lg">Join</Link>
                            </Col>
                            <Col md="6" className="image">
                                <img src={joinImage} className="img-fluid" alt="Food Truck" />
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </Layout>    
    )
}

export default Home;
