import { UuidMiddleware } from './uuid.middleware';

describe('UuidMiddleware', () => {
  it('should be defined', () => {
    expect(new UuidMiddleware()).toBeDefined();
  });
});
