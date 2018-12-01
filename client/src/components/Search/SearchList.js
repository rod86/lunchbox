import React from 'react';
import PropTypes from 'prop-types';


const renderItem = (item) => (
    <div className="list-group-item" key={item._id}>
        <div className="item-header">
            <h5 className="item-title">{item.name}</h5>
            <span className="item-distance">{item.distance.toFixed(2)} m</span>
        </div>
        <p className="item-location">{item.address}</p>
    </div>
);

const SearchList = ({ stands }) => {
    return (
        <div className="search-results-list">
            <div className="list-group">
                {stands.map(renderItem)}
            </div>
        </div>
    )
};

SearchList.propTypes = {
    stands: PropTypes.array.isRequired
};

export default SearchList;
