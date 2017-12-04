//import * as esTranslation from 'i18n/es.json';
//import * as enTranslation from 'i18n/es.json';

const esTranslation = require('i18n/es.json');
const enTranslation = require('i18n/en.json');

const EN = 'en';
const ES = 'es';

export const AVAILABLE_LANGS = [EN, ES];

const getTranslation = (lang = ES)  => {
  if (typeof lang !== 'string') {
    lang = '';
  }
  switch (lang) {
    case EN:
      return enTranslation;
    case ES:
    default:
      return esTranslation;
  }
};

export default {
  getTranslation
};
