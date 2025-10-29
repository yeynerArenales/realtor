import { getOwners, createOwner } from '@/app/services/owners.service';

describe('owners.service', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    (global as any).fetch = jest.fn();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy.mockRestore();
  });

  it('getOwners should call /api/Owners and return data', async () => {
    const owners = [{ id: '1', name: 'John', address: 'Addr', birthday: '2000-01-01', photo: '' }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ succeeded: true, data: owners }),
    });

    const result = await getOwners();
    expect(global.fetch).toHaveBeenCalledWith('/api/Owners', expect.objectContaining({ method: 'GET' }));
    expect(result).toEqual(owners);
  });

  it('getOwners should throw on non-ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, statusText: 'Bad' });
    await expect(getOwners()).rejects.toThrow('Failed to fetch owners');
  });

  it('createOwner should POST and return created owner', async () => {
    const input = { name: 'Jane', address: 'Addr', birthday: '1999-01-01' };
    const created = { id: '2', ...input, photo: '' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ succeeded: true, data: created }),
    });

    const result = await createOwner(input);
    expect(global.fetch).toHaveBeenCalledWith('/api/Owners', expect.objectContaining({ method: 'POST' }));
    expect(result).toEqual(created);
  });

  it('createOwner should throw on API error message', async () => {
    const input = { name: 'Jane', address: 'Addr', birthday: '1999-01-01' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ succeeded: false, message: 'Nope' }),
    });
    await expect(createOwner(input)).rejects.toThrow('Nope');
  });
});


