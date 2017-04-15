import React, { Component } from 'react';

export default class HomeBox extends Component {
  render() {
    return (
      <div id="main">
        <div className="header">
          <h1>Bem vindo(a)</h1>
        </div>

        <div className="content" id="content">
        </div>
      </div>
    );
  }
}