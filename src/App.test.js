import { render, screen } from '@testing-library/react';
import App from './App';

test('renders expense tracker title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Expense Tracker/i);
  expect(titleElement).toBeInTheDocument();
});