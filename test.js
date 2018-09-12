const { name, encrypt, decrypt, generateKey } = require('./index');

console.log('Testing package: ', name);

// Generate a new SECRET Token
const secret = generateKey();
console.log('Secret Key :', secret);

// Encrypting message using encrypt fuction
const message = 'my secret message';
console.log('Message :', message);

const encryptedMessage = encrypt(message, secret);
console.log('Encrypted Message: ', encryptedMessage);

const decryptedMessage = decrypt(encryptedMessage, secret);
console.log('Orginal Message: ', decryptedMessage);
