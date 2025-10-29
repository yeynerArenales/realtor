import { render, screen, fireEvent } from '@testing-library/react';
import PropertyGrid from '@/app/components/organisms/PropertyGrid';

const properties = [
  { id: 'p1', ownerId: 'o1', name: 'House 1', address: 'Addr', price: 1000, image: '' },
  { id: 'p2', ownerId: 'o2', name: 'House 2', address: 'Addr', price: 2000, image: '' },
];

describe('PropertyGrid', () => {
  it('renders property cards and opens modal on click', () => {
    render(<PropertyGrid properties={properties} />);
    expect(screen.getByText('House 1')).toBeInTheDocument();
    expect(screen.getByText('House 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('House 1'));
    // The modal renders a button with text Close
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});


