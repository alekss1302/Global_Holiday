import React from 'react';
import { render, screen } from '@testing-library/react';
import GlobalTime from './GlobalTime';

test('renders GlobalTime component', () => {
    render(<GlobalTime />);
    const headingElement = screen.getByText(/Global Time/i);
    expect(headingElement).toBeInTheDocument();
});
