import crypto from 'crypto';
import { NativeModules } from 'react-native';
import { promisify } from 'util';
import { btoa, atob } from 'Base64';
import FormData from 'react-native/Libraries/Network/FormData';

/**
 * Mock XMLHttpRequest.
 */
class XMLHttpRequest {}
global.XMLHttpRequest = XMLHttpRequest;

global.fetch = require('jest-fetch-mock');

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

jest.mock('react-native', () => require('react-native-mock-render'), {
  virtual: true
});

NativeModules.Aes = {
  pbkdf2: async function(text, salt, cost, length) {
    return promisify(crypto.pbkdf2)(text, salt, cost, length, null);
  },
  encrypt: async function(text) {
    return btoa(text);
  },
  decrypt: async function(base64) {
    return atob(base64);
  }
};

global.FormData = FormData;
