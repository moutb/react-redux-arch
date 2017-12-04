import React from 'react';
import { PropTypes } from 'prop-types';

const propTypes = {
  translate: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFieldChanged: PropTypes.func.isRequired
};

const LoginForm = (props) => {
  const { onSubmit, onFieldChanged, translate } = props;
  return (
    <div>
      <form onChange={ onFieldChanged } onSubmit={ onSubmit }>
        <input type="text" name="user" placeholder={ translate.get('login.placeholder.user') } />
        <input type="text" name="password" placeholder={ translate.get('login.placeholder.password') } />
        <button type="submit">
          { translate.get('login.submit') }
        </button>
        {/*error ? <p>{ error }</p> : null*/}
      </form>
    </div>
  );
};

LoginForm.propTypes = propTypes;

export default LoginForm;
