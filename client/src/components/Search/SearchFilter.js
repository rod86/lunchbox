import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, FormGroup, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';

const SearchFilter = ({ onUserLocationClick, onFilterChange, onSearch, location}) => (
    <Form inline className="row" className="search-filter" onSubmit={onSearch}>
        <Col xs={12} md={5}>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <Button color="primary" type="button" onClick={onUserLocationClick}>
                        <i className="fas fa-crosshairs"></i>
                    </Button>
                </InputGroupAddon>
                <Input placeholder="Location" name="location" value={location} onChange={onFilterChange} />
            </InputGroup>
        </Col>
        <Col xs={12} md={1}>
            <Button color="primary" id="search">
                <i className="fa fa-search"></i> Search
            </Button>
        </Col>
    </Form>
);

SearchFilter.propTypes = {
    onUserLocationClick: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    location: PropTypes.string.isRequired
};

export default SearchFilter;
