import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createUser } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorActions';
import { Form, FormGroup, Label, Input, Button, FormFeedback, Card, CardBody, CardFooter } from 'reactstrap';
import LoginLayout from '../Layout/LoginLayout';

class Signup extends Component {

    static propTypes = {
        createUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            password_confirm: '',
            error: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({ error: nextProps.error });
        }
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    onChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };

        this.props.createUser(user, this.props.history);
    }

    render() {
        const errors = this.props.error.errors;

        return (
            <LoginLayout>
                <Card>
                    <CardBody>
                        <h1 className="card-title text-center">Sign Up</h1>

                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" onChange={this.onChange} invalid={errors.hasOwnProperty('username')} />
                                {errors.username?(<FormFeedback>{errors.username}</FormFeedback>):''}
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" onChange={this.onChange} invalid={errors.hasOwnProperty('email')} />
                                {errors.email?(<FormFeedback>{errors.email}</FormFeedback>):''}
                            </FormGroup>  
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" onChange={this.onChange} invalid={errors.hasOwnProperty('password')} />
                                {errors.password?(<FormFeedback>{errors.password}</FormFeedback>):''}
                            </FormGroup>   
                            <FormGroup>
                                <Label for="password_confirm">Confirm Password</Label>
                                <Input type="password" name="password_confirm" onChange={this.onChange} invalid={errors.hasOwnProperty('password_confirm')} />
                                {errors.password_confirm?(<FormFeedback>{errors.password_confirm}</FormFeedback>):''}
                            </FormGroup>  

                            <div className="text-center pt-3">
                                <Button color="primary" size="lg" block>Sign Up</Button>
                            </div>
                        </Form>
                    </CardBody>
                    <CardFooter className="text-center bg-transparent border-0">
                        <p>Have an account? <Link to="/login">Login</Link></p>
                    </CardFooter>
                </Card>
            </LoginLayout>       
        )
    }
}

const mapStateToProps = state => ({
    error: state.error
});

export default connect(mapStateToProps, { createUser, clearErrors })(withRouter(Signup));
