import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Button, InputGroup, Alert, Card, CardBody, CardFooter } from 'reactstrap';
import { loginUser } from '../../actions/profileActions';

import LoginLayout from '../Layout/LoginLayout';

class Login extends Component {

    static propTypes = {
        loginUser: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/panel');
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/panel');
        }
    }

    onChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.loginUser(user);
    }

    render () {
        const { error } = this.props;

        return (
            <LoginLayout>
                <Card>
                    <CardBody>
                        <h1 className="card-title text-center">Login</h1>
                        
                        {error.description?(
                            <Alert color="danger">{error.description}</Alert>
                        ):''}

                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>    
                                <InputGroup className="input-icon" size="lg">
                                    <i className="fas fa-user"></i>
                                    <Input type="text" name="username" placeholder="Username or Email" onChange={this.onChange} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>    
                                <InputGroup className="input-icon" size="lg">
                                    <i className="fas fa-lock"></i>
                                    <Input type="password" name="password" placeholder="Password" onChange={this.onChange} />
                                </InputGroup>
                            </FormGroup>
                            <Button color="primary" size="lg" block>Log In</Button>
                        </Form>
                    </CardBody>
                    <CardFooter className="text-center bg-transparent border-0">
                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </CardFooter>
                </Card>
            </LoginLayout>    
        );
    }
}

const mapStateToProps = state => ({
    error: state.error,
    auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));