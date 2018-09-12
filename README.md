# nacl-encrypt
Encrypt/Decrypt your data with zero headache

### Installation

```
$ npm i nacl-encrypt --save
```
OR
```
$ yarn add nacl-encrypt
```

### Usage

```js
const { encrypt, decrypt } = require('nacl-encrypt');

const encryptedMessage = encrypt('My Message', secret);
console.log(encryptedMessage);

const decryptedMessage = decrypt(encryptedMessage, secret);
console.log(decryptedMessage); //=> 'My Message'
```

To generate a new secret token:
```js
const { generateKey } = require('nacl-encrypt');

const secret = generateKey();
console.log(secret); //=> 8vFzw/vcRY6w8w6QQFKXTIoN3mjwazwO48sYwWhCRc0=
```

### Test

```
$ npm test
```