import React, { Component } from 'react';

import style from './style.css';

export class Main extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className={ style.Main }>
        <h2>Main view</h2>
      </div>
    );
  }
}

export default Main;
