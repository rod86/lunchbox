import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const IconBox = ({ title, icon, color, url }) => (
    <Col lg="2" md="4" sm="6">
        <Link to={url} className={`btn btn-lg btn-${color} rounded-0 py-4 btn-block mb-4 mb-md-0`}>
            <i className={`fas ${icon} fa-2x pb-2`}></i> <br/>
            {title}
        </Link>
    </Col>
);

IconBox.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    url: PropTypes.string.isRequired
};

IconBox.defaultProps = {
    color: "primary"
};

export default IconBox;
