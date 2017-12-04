import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'store/reducers/auth';
import { switchLanguage } from 'store/reducers/i18n';
import { browserHistory } from 'react-router';

import LoginForm from 'components/LoginForm';
import LanguageSelector from 'components/LanguageSelector';

export class Login extends Component {

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    translate: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      form: {}
    };
    this.actions = bindActionCreators(authActions, props.dispatch);
  }

  onSubmit(evt) {
    evt.preventDefault();
    const { user, password } = this.state.form;
    this.props.dispatch(authActions.login(user, password))
      .then((_) => {
        console.log('success', _);
        this.setState({ ...this.state, submitted: true });
        browserHistory.push('/');
      })
      .catch((error) => this.setState({ error }));
  }

  onFieldChanged(event) {
    let form = this.state.form;
    form[event.target.name] = event.target.value;
    this.setState({...this.state, form: form});
  }

  onLanguageSelected(event) {
    this.props.dispatch(switchLanguage(event.target.value));
  }

  render() {
    const { state: {submitted, error}, props: { translate } } = this;
    return (
      <div>
        <h2>{ translate.get('login.title') }</h2>
        <LoginForm onSubmit={ ::this.onSubmit } onFieldChanged={ ::this.onFieldChanged } translate={ translate } submitted={ submitted } error={ error } />
        <LanguageSelector onChange={ ::this.onLanguageSelected } translate={ translate } />
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user, translate: state.translate})
)(Login);
