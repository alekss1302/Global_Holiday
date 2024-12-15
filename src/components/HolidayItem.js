import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const HolidayItem = ({ holiday }) => {
    const getTimeRemaining = (holidayDate) => {
        const now = new Date();
        const targetDate = new Date(holidayDate);
        const timeDiff = targetDate - now;

        if (targetDate.toDateString() === now.toDateString()) {
            return 'Today';
        }

        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return `${days} days remaining`;
    };

    return (
        <div className="holiday-item">
            <h3><FontAwesomeIcon icon={faCalendarAlt} /> {holiday.name}</h3>
            <div>
                <p>{holiday.date}</p>
                <p>{getTimeRemaining(holiday.date)}</p>
            </div>
        </div>
    );
};

export default HolidayItem;
