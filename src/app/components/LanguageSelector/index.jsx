import React from 'react';
import PropTypes from 'prop-types';
import { AVAILABLE_LANGS } from 'app/api/i18n';

const propTypes = {
  translate: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

const LanguageSelector = (props) => {
  const { translate, onChange } = props;
  return (
    <select value={ translate.lang } onChange={ onChange }>
      {
        AVAILABLE_LANGS.map((l, i) => {
          return (<option key={ i } value={ l }>
            { translate.get(`languageSelector.${l}`) }
          </option>);
        })
      }
    </select>
  );
};

LanguageSelector.propTypes = propTypes;

export default LanguageSelector;
