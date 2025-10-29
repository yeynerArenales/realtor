import { render, screen, fireEvent } from '@testing-library/react';
import OwnerGrid from '@/app/components/organisms/OwnerGrid';

const owners = [
  { id: '1', name: 'John', address: 'Addr 1', birthday: '2000-01-01', photo: '' },
  { id: '2', name: 'Jane', address: 'Addr 2', birthday: '1999-01-01', photo: '' },
];

describe('OwnerGrid', () => {
  it('renders owner cards and opens modal on click', () => {
    render(<OwnerGrid owners={owners} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();

    fireEvent.click(screen.getByText('John'));
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});


