import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePropertyModal from '@/app/components/organisms/CreatePropertyModal';

jest.mock('@/app/hooks/useOwners', () => ({
  useOwners: () => ({ owners: [
    { id: 'o1', name: 'Owner 1', address: 'A', birthday: '2000-01-01', photo: '' },
  ] }),
}));

describe('CreatePropertyModal', () => {
  it('validates required fields', async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    render(<CreatePropertyModal isOpen={true} onClose={onClose} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText('Create Property'));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Address is required')).toBeInTheDocument();
    expect(screen.getByText('Owner is required')).toBeInTheDocument();
    expect(screen.getByText('Valid price is required')).toBeInTheDocument();
    expect(screen.getByText('Internal code is required')).toBeInTheDocument();
    expect(screen.getByText('Valid year is required')).toBeInTheDocument();
  });

  it('submits valid form and closes', async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    render(<CreatePropertyModal isOpen={true} onClose={onClose} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'House' } });
    fireEvent.change(screen.getByLabelText('Address *'), { target: { value: 'Addr' } });
    fireEvent.change(screen.getByLabelText('Owner *'), { target: { value: 'o1' } });
    fireEvent.change(screen.getByLabelText('Price (USD) *'), { target: { value: '1200' } });
    fireEvent.change(screen.getByLabelText('Year *'), { target: { value: String(new Date().getFullYear()) } });
    fireEvent.change(screen.getByLabelText('Internal Code *'), { target: { value: 'INT-1' } });

    fireEvent.click(screen.getByText('Create Property'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({
      name: 'House',
      address: 'Addr',
      idOwner: 'o1',
      price: 1200,
      codeInternal: 'INT-1',
      year: new Date().getFullYear(),
    }));
    expect(onClose).toHaveBeenCalled();
  });
});


