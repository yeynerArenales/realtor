import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateOwnerModal from '@/app/components/organisms/CreateOwnerModal';

describe('CreateOwnerModal', () => {
  it('validates required fields', async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    render(<CreateOwnerModal isOpen={true} onClose={onClose} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText('Create Owner'));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Address is required')).toBeInTheDocument();
    expect(screen.getByText('Birthday is required')).toBeInTheDocument();
  });

  it('submits valid form and closes', async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    render(<CreateOwnerModal isOpen={true} onClose={onClose} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Address *'), { target: { value: 'Addr' } });
    fireEvent.change(screen.getByLabelText('Birthday *'), { target: { value: '2000-01-01' } });

    fireEvent.click(screen.getByText('Create Owner'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onClose).toHaveBeenCalled();
  });
});


