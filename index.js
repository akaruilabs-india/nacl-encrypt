const { secretbox, randomBytes } = require('tweetnacl');
const {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64
} = require('tweetnacl-util');

exports.name = 'nacl-encrypt';

const key = process.env.SECRET_KEY;

const newNonce = () => randomBytes(secretbox.nonceLength);

exports.generateKey = () => encodeBase64(randomBytes(secretbox.keyLength));

exports.encrypt = (message, secret) => {
  secret = secret || key;
  if (!secret) {
    throw new Error('Couldn\'t find any secret token. Make sure you passed it or SECRET_KEY is present in ENV 🙁');
  }

  const keyUint8Array = decodeBase64(secret);
  const nonce = newNonce();
  const messageUint8 = decodeUTF8(message);
  const box = secretbox(messageUint8, nonce, keyUint8Array);

  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);

  const base64FullMessage = encodeBase64(fullMessage);
  return base64FullMessage;
};

exports.decrypt = (messageWithNonce, secret) => {
  secret = secret || key;
  if (!secret) {
    throw new Error('Couldn\'t find any secret token. Make sure you passed it or SECRET_KEY is present in ENV 🙁');
  }

  const keyUint8Array = decodeBase64(secret);
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, secretbox.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(
    secretbox.nonceLength,
    messageWithNonce.length
  );

  const decrypted = secretbox.open(message, nonce, keyUint8Array);

  if (!decrypted) {
    throw new Error('Failed to decrypt message 🙁');
  }

  const base64DecryptedMessage = encodeUTF8(decrypted);
  return base64DecryptedMessage;
};
