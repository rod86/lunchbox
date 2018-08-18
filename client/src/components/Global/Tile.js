import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';

const Tile = ({ header, children }) => {
    return (
        <Card className="tile">
            {header ? (
                <CardHeader>
                    <h2 className="h5">{header}</h2>
                </CardHeader>
            ) : ''}
            <CardBody>
                {children}
            </CardBody>    
        </Card> 
    )
}

Tile.propTypes = {
    header: PropTypes.string
};

export default Tile;