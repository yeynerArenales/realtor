import { getProperties, createProperty } from '@/app/services/properties.service';

describe('properties.service', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    (global as any).fetch = jest.fn();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy.mockRestore();
  });

  it('getProperties should build query string and return data', async () => {
    const properties = [{ id: 'p1', name: 'House', address: 'Addr', price: 1000, image: '' }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ succeeded: true, data: properties }),
    });

    const result = await getProperties({ name: 'abc', minPrice: '10' });
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain('/api/Properties?');
    expect(result).toEqual(properties);
  });

  it('getProperties should throw on non-ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, statusText: 'Bad' });
    await expect(getProperties()).rejects.toThrow('Failed to fetch properties');
  });

  it('createProperty should POST and return created property', async () => {
    const input = { name: 'New', address: 'Addr', price: 10, image: '' };
    const created = { id: 'p2', ...input };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ succeeded: true, data: created }),
    });

    const result = await createProperty(input as any);
    expect(global.fetch).toHaveBeenCalledWith('/api/Properties', expect.objectContaining({ method: 'POST' }));
    expect(result).toEqual(created);
  });
});


