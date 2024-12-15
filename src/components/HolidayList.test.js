import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HolidayList from './HolidayList';

const holidays = [
    { name: 'Independence Day', date: '2024-07-04', localName: 'Independence Day', countryCode: 'US' },
    { name: 'August Festivals', date: '2024-08-15', localName: 'August Festivals', countryCode: 'US' },
];

test('renders today\'s holidays', () => {
    render(<HolidayList todayHolidays={holidays} upcomingHolidays={[]} />);
    const holidayElements = screen.getAllByText(/Independence Day|August Festivals/i);
    expect(holidayElements.length).toBe(2);
});

test('renders upcoming holidays', () => {
    render(<HolidayList todayHolidays={[]} upcomingHolidays={holidays} />);
    const holidayElements = screen.getAllByText(/Independence Day|August Festivals/i);
    expect(holidayElements.length).toBe(2);
});

test('modal opens with holiday details', () => {
    render(<HolidayList todayHolidays={holidays} upcomingHolidays={[]} />);
    const detailsButton = screen.getAllByText('Details')[0];
    fireEvent.click(detailsButton);
    const modalContent = screen.getByText(/Date: 2024-07-04/i);
    expect(modalContent).toBeInTheDocument();
});

test('filters holidays by name', () => {
    render(<HolidayList todayHolidays={holidays} upcomingHolidays={holidays} />);
    const input = screen.getByPlaceholderText('Search holidays...');
    fireEvent.change(input, { target: { value: 'August' } });
    const holidayElements = screen.getAllByText(/August Festivals/i);
    expect(holidayElements.length).toBe(2);
});

test('sorts holidays by name', () => {
    render(<HolidayList todayHolidays={holidays} upcomingHolidays={holidays} />);
    const select = screen.getByDisplayValue('Sort By');
    fireEvent.change(select, { target: { value: 'name' } });
    const holidayElements = screen.getAllByRole('heading', { level: 3 });
    expect(holidayElements[0]).toHaveTextContent('August Festivals');
    expect(holidayElements[1]).toHaveTextContent('August Festivals');
    expect(holidayElements[2]).toHaveTextContent('Independence Day');
    expect(holidayElements[3]).toHaveTextContent('Independence Day');
});

test('sorts holidays by date', () => {
    render(<HolidayList todayHolidays={holidays} upcomingHolidays={holidays} />);
    const select = screen.getByDisplayValue('Sort By');
    fireEvent.change(select, { target: { value: 'date' } });
    const holidayElements = screen.getAllByRole('heading', { level: 3 });
    expect(holidayElements[0]).toHaveTextContent('Independence Day');
    expect(holidayElements[1]).toHaveTextContent('Independence Day');
    expect(holidayElements[2]).toHaveTextContent('August Festivals');
    expect(holidayElements[3]).toHaveTextContent('August Festivals');
});
