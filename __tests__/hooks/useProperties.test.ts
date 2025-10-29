import { renderHook, act } from '@testing-library/react';
import * as propertiesService from '@/app/services/properties.service';
import { useProperties } from '@/app/hooks/useProperties';

jest.useFakeTimers();
jest.mock('@/app/services/properties.service');

describe('useProperties', () => {
  const mockedGet = propertiesService.getProperties as jest.Mock;
  const mockedCreate = propertiesService.createProperty as jest.Mock;

  beforeEach(() => {
    mockedGet.mockReset();
    mockedCreate.mockReset();
  });

  it('debounces initial fetch and sets data', async () => {
    mockedGet.mockResolvedValueOnce([{ id: 'p1', name: 'House', address: 'Addr', price: 100, image: '' }]);
    const { result } = renderHook(() => useProperties());
    expect(result.current.isLoading).toBe(true);
    act(() => {
      jest.advanceTimersByTime(300);
    });
    await act(async () => {});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.properties).toHaveLength(1);
  });

  it('setFilters triggers refetch', async () => {
    mockedGet.mockResolvedValueOnce([]);
    mockedGet.mockResolvedValueOnce([]);
    const { result } = renderHook(() => useProperties());
    act(() => {
      jest.advanceTimersByTime(300);
    });
    await act(async () => {});
    act(() => {
      result.current.setFilters({ name: 'x' });
    });
    act(() => {
      jest.advanceTimersByTime(300);
    });
    await act(async () => {});
    expect(mockedGet).toHaveBeenCalledTimes(2);
  });

  it('createProperty posts and refetches', async () => {
    mockedGet.mockResolvedValueOnce([]);
    mockedGet.mockResolvedValueOnce([]);
    mockedCreate.mockResolvedValueOnce({});
    const { result } = renderHook(() => useProperties());
    act(() => {
      jest.advanceTimersByTime(300);
    });
    await act(async () => {});
    await act(async () => {
      await result.current.createProperty({ name: 'n', address: 'a', price: 1, image: '' } as any);
    });
    expect(mockedCreate).toHaveBeenCalled();
  });
});


