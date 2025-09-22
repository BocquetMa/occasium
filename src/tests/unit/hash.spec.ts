import { describe, it, expect } from 'vitest';
import { hash, compare } from '../../utils/hash';

describe('Hash utils', () => {
  it('should hash a password and compare correctly', async () => {
    const password = 'mypassword';
    const hashed = await hash(password);
    expect(await compare(password, hashed)).toBe(true);
    expect(await compare('wrongpassword', hashed)).toBe(false);
  });
});
