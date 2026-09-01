import React from 'react';
import { render, screen } from '@testing-library/react';
import './i18n';
import App from '../../../../Downloads/Global_Holiday_Refreshed_Patch/src/App';

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([])
        })
    );
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('renders the Global Holiday Finder heading', async () => {
    render(<App />);

    expect(
        screen.getByRole('heading', { name: /Global Holiday Finder/i })
    ).toBeInTheDocument();

    expect(
        await screen.findByText(/No upcoming holidays match/i)
    ).toBeInTheDocument();
});
