import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import InputCustomizado from '../../inputCustomizado';
import SubmitCustomizado from '../../submitCustomizado';

export default class FormularioAutor extends Component {
  constructor() {
    super();
    this.state = {nome: '', email: '', senha: ''};
    this.enviaForm = this.enviaForm.bind(this);
    this.salvaAlteracao = this.salvaAlteracao.bind(this);
  }

  salvaAlteracao(evento) {
    this.setState({[evento.target.name]: evento.target.value});
  }

  enviaForm(evento) {
    evento.preventDefault();
    $.ajax({
      type: 'post',
      url: 'http://localhost:8080/api/autores',
      contentType: 'application/json',
      data: JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha}),
      beforeSend: () => PubSub.publish('limpa-erros', {}),
      success: resposta => {
        PubSub.publish('atualiza-lista-autores', resposta);
        this.setState({nome: '', email: '', senha: ''});
      },
      error: resposta => {
        if (resposta.status === 400) {
          resposta.responseJSON.errors.forEach(erro => PubSub.publish('erro-validacao', erro));
        }
      }
    });
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
          <InputCustomizado label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.salvaAlteracao} />
          <InputCustomizado label="Email" id="email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao} />
          <InputCustomizado label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={this.salvaAlteracao}/>
          <SubmitCustomizado value="Gravar"/>
        </form>
      </div>
    );
  }
}