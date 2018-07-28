import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../../actions/profileActions';
import { Row, Col } from 'reactstrap';
import Tile from '../../Global/Tile';
import Moment from 'react-moment';

class ProfileDetails extends Component {
    static propTypes = {
        profile: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        const { profile } = this.props.profile;

        return (
            <Tile header="Profile">
                <Row>
                    <Col className="text-center mb-3">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-black-50"></i>
                            <i className="fas fa-user fa-stack-1x fa-inverse"></i>
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <dl>
                            <dt>Username</dt>
                            <dd>{profile.username}</dd>
                            <dt>Email</dt>
                            <dd>{profile.email}</dd>
                            <dt>Created At</dt>
                            <dd><Moment format="DD/MM/YYYY HH:mm">{profile.created_at}</Moment></dd>
                            <dt>Updated At</dt>
                            <dd><Moment format="DD/MM/YYYY HH:mm">{profile.updated_at}</Moment></dd>
                        </dl>
                    </Col>
                </Row>
            </Tile>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    };
};

export default connect(mapStateToProps, { getCurrentProfile })(ProfileDetails);