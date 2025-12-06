import React from 'react';
import './Common.css';

const Select = ({ label, value, onChange, options, disabled, name }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && <label className="form-label">{label}</label>}
            <select
                name={name}
                className="form-control"
                value={value}
                onChange={onChange}
                disabled={disabled}
                style={{ cursor: 'pointer' }}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
