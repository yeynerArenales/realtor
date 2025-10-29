import { renderHook, act } from '@testing-library/react';
import * as ownersService from '@/app/services/owners.service';
import { useOwners } from '@/app/hooks/useOwners';

jest.mock('@/app/services/owners.service');

describe('useOwners', () => {
  const mockedGetOwners = ownersService.getOwners as jest.Mock;
  const mockedCreateOwner = ownersService.createOwner as jest.Mock;

  beforeEach(() => {
    mockedGetOwners.mockReset();
    mockedCreateOwner.mockReset();
  });

  it('fetches owners on mount and sets state', async () => {
    mockedGetOwners.mockResolvedValueOnce([{ id: '1', name: 'A', address: 'Addr', birthday: '2000-01-01', photo: '' }]);
    const { result } = renderHook(() => useOwners());

    expect(result.current.isLoading).toBe(true);
    await act(async () => {});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.owners).toHaveLength(1);
  });

  it('sets error on fetch failure', async () => {
    mockedGetOwners.mockRejectedValueOnce(new Error('fail'));
    const { result } = renderHook(() => useOwners());
    await act(async () => {});
    expect(result.current.error).toBe(true);
  });

  it('createOwner calls service and refetches', async () => {
    mockedCreateOwner.mockResolvedValueOnce({});
    mockedGetOwners.mockResolvedValueOnce([]); // initial
    mockedGetOwners.mockResolvedValueOnce([]); // after create
    const { result } = renderHook(() => useOwners());
    await act(async () => {});
    await act(async () => {
      await result.current.createOwner({ name: 'B', address: 'Addr', birthday: '1999-01-01' });
    });
    expect(mockedCreateOwner).toHaveBeenCalled();
    expect(mockedGetOwners).toHaveBeenCalledTimes(2);
  });
});


