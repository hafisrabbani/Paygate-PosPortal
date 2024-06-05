const {encryptAES, decryptAES} = require('../utils/utils');

test('Test Encrypt and Decrypt AES', () => {
    const text = 'Hello World';
    const key = 'gede';
    const encrypted = encryptAES(text, key);
    const decrypted = decryptAES(encrypted, key);
    expect(decrypted).toBe(text);
});