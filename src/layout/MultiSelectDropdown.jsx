import React, { useState, useRef, useEffect } from 'react';
import './MultiCheckboxDropdown.css';

const MultiSelectDropdown = ({ options, onSelect, fetchedOptions, disabled = false }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectAll, setSelectAll] = useState(false);
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        let updatedSelection;

        if (selectedOptions.includes(value)) {
            updatedSelection = selectedOptions.filter((option) => option !== value);
        } else {
            updatedSelection = [...selectedOptions, value];
        }

        setSelectedOptions(updatedSelection);
        onSelect(updatedSelection);
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            // Deselect all
            setSelectedOptions([]);
        } else {
            // Select all options
            setSelectedOptions(options);
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        const fetchSelectedOptions = async () => {
            setSelectedOptions(fetchedOptions);

            setSelectAll(fetchedOptions.length === options.length);
        };
        if (fetchedOptions.length > 0) {
            fetchSelectedOptions();
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [fetchedOptions]);

    return (
        <div className="multi-checkbox-dropdown" ref={dropdownRef}>
            <div className="dropdown-button" onClick={toggleDropdown}>
                Select Options
            </div>

            {isDropdownOpen && (
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                            disabled={disabled}
                        />
                        <label>Select All</label>
                    </div>
                    {options.map((option) => (
                        <label key={option} className="dropdown-item">
                            <input
                                type="checkbox"
                                value={option}
                                checked={selectedOptions.includes(option)}
                                onChange={handleCheckboxChange}
                                disabled={disabled}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;