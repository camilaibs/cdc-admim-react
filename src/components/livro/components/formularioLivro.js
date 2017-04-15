import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import InputCustomizado from '../../inputCustomizado';
import SelectCustomizado from '../../selectCustomizado';
import SubmitCustomizado from '../../submitCustomizado';

export default class FormularioLivro extends Component {
  constructor() {
    super();
    this.state = {lista: [], titulo: '', preco: '', autorId: ''};
    this.enviaForm = this.enviaForm.bind(this);
    this.salvaAlteracao = this.salvaAlteracao.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:8080/api/autores',
      data: 'json',
      success: resposta => this.setState({lista: resposta})
    });

  }

  salvaAlteracao(evento) {
    this.setState({[evento.target.name]: evento.target.value});
  }

  enviaForm(evento) {
    evento.preventDefault();
    $.ajax({
      type: 'post',
      url: 'http://localhost:8080/api/livros',
      contentType: 'application/json',
      data: JSON.stringify({titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId}),
      beforeSend: () => PubSub.publish('limpa-erros', {}),
      success: resposta => {
        PubSub.publish('atualiza-lista-livros', resposta);
        this.setState({titulo: '', preco: '', autorId: ''});
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
          <InputCustomizado label="Título" id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.salvaAlteracao} />
          <InputCustomizado label="Preço" id="preco" type="text" name="preco" value={this.state.preco} onChange={this.salvaAlteracao} />
          <SelectCustomizado label="Autor" id="autorId" value={this.state.autorId} name="autorId" lista={this.state.lista} onChange={this.salvaAlteracao}/>
          <SubmitCustomizado value="Gravar"/>
        </form>
      </div>
    );
  }
}