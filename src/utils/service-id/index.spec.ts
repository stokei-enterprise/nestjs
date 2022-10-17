import { createServiceId } from '.';

describe('createServiceId', () => {
  it('should create service id', () => {
    expect(
      createServiceId({
        service: 'meuservice',
        module: 'meuservice',
        id: 'meuid'
      })
    ).toBe('meuservice_meuid');
  });
  it('should remove service id when data.id has service', () => {
    expect(
      createServiceId({
        service: 'meuservice',
        module: 'meuservice',
        id: 'otherservice_meuid'
      })
    ).toBe('meuservice_meuid');
  });
});
