import React from 'react';
import { render, screen } from '@testing-library/react';
import HolidayItem from './HolidayItem';

const holiday = {
    name: "New Year's Day",
    date: "2025-01-01"
};

test('renders HolidayItem component', () => {
    render(<HolidayItem holiday={holiday} />);
    const nameElement = screen.getByText(/New Year's Day/i);
    expect(nameElement).toBeInTheDocument();
    const dateElement = screen.getByText(/2025-01-01/i);
    expect(dateElement).toBeInTheDocument();
});
