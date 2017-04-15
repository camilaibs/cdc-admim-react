import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class SelectCustomizado extends Component {
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
        <select id={this.props.id} name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
          <option value="">Selecione</option>
          {this.props.lista.map(item => {
            return <option key={item.id} value={item.id}>{item.nome}</option>
          })}
        </select>
        <span className="error">{this.state.erro}</span>
      </div>
    );
  }
}