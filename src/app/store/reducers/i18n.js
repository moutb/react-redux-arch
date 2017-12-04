import translator from 'app/api/i18n';

const SWITCH_LANGUAGE = 'galeriajs/i18n/SWITCH_LANGUAGE';

const initialState = {
  lang: 'es'
};

export default function reducer(state = initialState, action = {}) {
  //console.log('loading language', state, action)
  switch (action.type) {
    case SWITCH_LANGUAGE:
    case '@@redux/INIT':
      return {
        ...state,
        lang: action.lang || state.lang,
        get: getTranslation.bind(this, translator.getTranslation(action.lang))
      };
    default:
      return state;
  }
}

const getTranslation = (source = null, key = '') => {
  if (source == null) {
    source = {};
  }
  let value = key.split('.').reduce((tot, curr) => {
    return typeof tot[curr] !== 'undefined' ? tot[curr] : {};
  }, source);
  return typeof value === 'string' ? value : key;
};


export function switchLanguage(lang) {
  return {
    type: SWITCH_LANGUAGE,
    lang: lang
  };
}
