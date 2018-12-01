import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Container, Row, Col, Form, FormGroup, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { getUserPositionWithAddress } from '../../actions/geolocationActions';
import { searchStands } from '../../actions/searchActions';
import classnames from 'classnames';
import Layout from '../Layout/Layout';
import SearchFilter from './SearchFilter';
import SearchTabs from './SearchTabs';
import SearchList from './SearchList';
import SearchMap from './SearchMap';


class Search extends Component {

    static propTypes = {
        getUserPositionWithAddress: PropTypes.func.isRequired,
        searchStands: PropTypes.func.isRequired,
        userPosition: PropTypes.object.isRequired,
        search: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'list',
            filter: {
                location: ''
            }
        }

        this.onChangeTab = this.onChangeTab.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onUserLocationClick = this.onUserLocationClick.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userPosition) {
            const { loading, address } = nextProps.userPosition;
            if (!loading && address) {
                this.setState({ filter: {location: address } });
            }
        }
    }

    onFilterChange(e) {
        e.preventDefault();
        this.setState({ filter: {[e.target.name]: e.target.value} });       
    }

    onChangeTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    onUserLocationClick() {
        this.props.getUserPositionWithAddress();
    }

    onSearchClick(e) {
        e.preventDefault();

        if (this.props.search.loading) {
            return;
        }

        const { location } = this.state.filter;
        this.props.searchStands(location);
    }

    render() {
        const { activeTab } = this.state,
            { search } = this.props;

        return (
            <Layout id="search-page">
                <Container>
                    <Row noGutters>
                        <Col>
                            <SearchFilter
                                location={this.state.filter.location}
                                onFilterChange={this.onFilterChange}
                                onUserLocationClick={this.onUserLocationClick}
                                onSearch={this.onSearchClick}
                                />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <SearchTabs 
                                activeTab={this.state.activeTab} 
                                onChangeTab={this.onChangeTab} />
                        </Col>
                    </Row>
                    <Row noGutters className="search-results">
                        <Col md={4} className={classnames({ active: activeTab === 'list' })}>
                            <SearchList 
                                stands={(!search.loading && search.results.length) ? search.results : []}
                                />
                        </Col>
                        <Col md={8} className={classnames({ active: activeTab === 'map' })}>
                            <SearchMap />
                        </Col>
                    </Row>
                </Container>
            </Layout> 
        )
    }
}

const mapStateToProps = state => ({
    userPosition: state.geolocation.userPosition,
    search: state.search
});

export default connect(mapStateToProps, { getUserPositionWithAddress, searchStands })(Search);