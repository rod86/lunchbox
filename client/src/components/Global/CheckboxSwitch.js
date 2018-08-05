import React from 'react'
import PropTypes  from 'prop-types';
import Switch from 'react-switch';

const CheckboxSwitch = ({ children, id, onChange, checked }) => {
    return (
        <div className="checkbox-switch">
            <label htmlFor={id}>
                <Switch 
                    onChange={onChange} 
                    checked={checked} 
                    id={id} 
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    />
                {children ? (<span>{children}</span>) : ''}
            </label>
        </div>
    );
}

CheckboxSwitch.propTypes = {
    id:  PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool
};

CheckboxSwitch.defaultProps = {
    checked: false
};

export default CheckboxSwitch;


