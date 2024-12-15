import React from 'react';
import './Modal.css';

const Modal = ({ holiday, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{holiday.name}</h2>
                <p><strong>Date:</strong> {holiday.date}</p>
                <p><strong>Local Name:</strong> {holiday.localName}</p>
                <p><strong>Country Code:</strong> {holiday.countryCode}</p>
                {holiday.description && <p><strong>Description:</strong> {holiday.description}</p>}
                {holiday.image && <img src={holiday.image} alt={`${holiday.name}`} />}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
