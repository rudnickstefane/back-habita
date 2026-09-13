import * as argon2 from 'argon2';

export class ArgonCrypto {
  static hash(value: string): Promise<string> {
    if (!value) {
      throw new Error('Houve um erro durante o processo de criptografia.');
    }

    return argon2.hash(value, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });
  }

  static async verifyPassword(currentPassword: string, bdPassword: string): Promise<boolean> {
    try {
      return await argon2.verify(bdPassword, currentPassword);
    } catch {
      return false;
    }
  }
}
