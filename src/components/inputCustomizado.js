import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputCustomizado extends Component {
  constructor() {
    super();
    this.state = {erro: ''};
  }

  componentWillMount() {
    PubSub.subscribe('limpa-erros', () => this.setState({erro: ''}));
    PubSub.subscribe('erro-validacao', (topico, erro) => {
      if (erro.field === this.props.name) {
        this.setState({erro: erro.defaultMessage});
      }
    });
  }

  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input {...this.props} />
        <span className="error">{this.state.erro}</span>
      </div>
    );
  }
}