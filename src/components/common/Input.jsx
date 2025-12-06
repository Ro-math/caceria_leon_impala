import React from 'react';
import './Common.css';

const Input = ({ label, type = 'text', value, onChange, placeholder, disabled, min, max, name }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && <label className="form-label">{label}</label>}
            <input
                name={name}
                type={type}
                className="form-control"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                min={min}
                max={max}
            />
        </div>
    );
};

export default Input;
