import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
import Tile from '../Global/Tile';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { updatePassword } from '../../actions/profileActions';
import { clearErrors } from '../../actions/errorActions';

class ProfileChangePassword extends Component {
    
    static propTypes = {
        updatePassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired,
        profile: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            current_password: '',
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
        const data = {
            current_password: this.state.current_password,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };

        this.props.updatePassword(data);
    }

    render() {
        const errors = this.props.error.errors;

        return (
            <Tile header="Change Password">
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="current_password">Current Password</Label>
                        <Input type="password" name="current_password" value={this.state.current_password} onChange={this.onChange} invalid={errors.hasOwnProperty('current_password')} />
                        {errors.current_password?(<FormFeedback>{errors.current_password}</FormFeedback>):''}
                    </FormGroup>  
                    <FormGroup>
                        <Label for="password">New Password</Label>
                        <Input type="password" name="password" value={this.state.password} onChange={this.onChange} invalid={errors.hasOwnProperty('password')} />
                        {errors.password?(<FormFeedback>{errors.password}</FormFeedback>):''}
                    </FormGroup> 
                    <FormGroup>
                        <Label for="password_confirm">Confirm New Password</Label>
                        <Input type="password" name="password_confirm" value={this.state.password_confirm} onChange={this.onChange} invalid={errors.hasOwnProperty('password_confirm')} />
                        {errors.password_confirm?(<FormFeedback>{errors.password_confirm}</FormFeedback>):''}
                    </FormGroup> 
                    <div className="text-right">
                        <Button color="primary">Save</Button>
                    </div>
                </Form>
            </Tile>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error,
    profile: state.profile
});

export default connect(mapStateToProps, { updatePassword, clearErrors })(ProfileChangePassword);
