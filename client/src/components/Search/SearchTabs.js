import React from 'react';
import PropTypes from 'prop-types'
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

const SearchTabs = ({ activeTab, onChangeTab }) => {
    return (
        <Nav tabs fill className="search-tabs">
            <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === 'list' })}
                    onClick={() => onChangeTab('list')}>
                    <i className="fas fa-bars"></i> List
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === 'map' })}
                    onClick={() => onChangeTab('map')}>
                    <i className="fas fa-map"></i> Map
                </NavLink>
            </NavItem>
        </Nav>
    );
}

SearchTabs.propTypes = {
    activeTab: PropTypes.string,
    onChangeTab: PropTypes.func.isRequired
};

SearchTabs.defaultProps = {
    activeTab: 'list'
};

export default SearchTabs;






