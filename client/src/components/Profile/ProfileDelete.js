import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Alert, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import Tile from '../Global/Tile';
import { deleteProfile } from '../../actions/profileActions';

class ProfileDelete extends Component {

    static propTypes = {
        deleteProfile: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            isSubmitEnabled: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});

        if (e.target.name === 'username') {
            this.setState({ isSubmitEnabled: e.target.value === this.props.auth.user.username });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.deleteProfile(this.props.history);
    }

    render() {
        const { error } = this.props;

        return (
            <Tile header="Delete Account">
                {error.description?(
                    <Alert color="danger">{error.description}</Alert>
                ):''}
                <Form onSubmit={this.onSubmit}>
                    <p>
                        This will delete the account with all related data and it cannot be undone. Type your username to confirm.
                    </p>
                    <FormGroup>
                        <Input type="text" name="username" value={this.state.username} onChange={this.onChange} />
                    </FormGroup>
                    <div className="text-right">
                        <Button color="danger" disabled={!this.state.isSubmitEnabled}>Delete my account</Button>
                    </div>
                </Form>
            </Tile> 
        )
    }
}

const mapStateToProps = state => ({
    error: state.error,
    auth: state.auth
});

export default connect(mapStateToProps, { deleteProfile })(withRouter(ProfileDelete));