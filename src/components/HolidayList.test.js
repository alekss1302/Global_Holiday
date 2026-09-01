import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '../i18n';
import HolidayList from './HolidayList';

const sampleHolidays = [
    {
        date: '2099-07-04',
        localName: 'Independence Day',
        name: 'Independence Day',
        countryCode: 'US',
        global: true,
        types: ['Public']
    },
    {
        date: '2099-08-15',
        localName: 'Festival Day',
        name: 'Festival Day',
        countryCode: 'GB',
        global: true,
        types: ['Public']
    }
];

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(sampleHolidays)
        })
    );
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('loads and displays holidays from the API', async () => {
    render(<HolidayList />);

    expect(await screen.findByText('Independence Day')).toBeInTheDocument();
    expect(screen.getByText('Festival Day')).toBeInTheDocument();
});

test('filters holidays by name', async () => {
    render(<HolidayList />);

    const input = await screen.findByPlaceholderText(/Search by holiday name/i);
    fireEvent.change(input, { target: { value: 'Festival' } });

    expect(screen.getByText('Festival Day')).toBeInTheDocument();
    expect(screen.queryByText('Independence Day')).not.toBeInTheDocument();
});

test('shows retry UI when the API fails', async () => {
    global.fetch.mockImplementationOnce(() =>
        Promise.resolve({ ok: false, status: 500 })
    );

    render(<HolidayList />);

    expect(
        await screen.findByText(/Holiday data could not be loaded/i)
    ).toBeInTheDocument();

    expect(
        screen.getByRole('button', { name: /Try again/i })
    ).toBeInTheDocument();
});
