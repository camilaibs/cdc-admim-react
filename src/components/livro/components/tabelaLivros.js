import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

export default class TabelaLivros extends Component {
  constructor() {
    super();
    this.state = {lista: []};
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:8080/api/livros',
      data: 'json',
      success: resposta => this.setState({lista: resposta})
    });

    PubSub.subscribe('atualiza-lista-livros', (topico, novaLista) => this.setState({lista: novaLista}));
  }

  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
          <tr>
            <th>Título</th>
            <th>Preço</th>
            <th>Autor</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.lista.map(livro => {
              return (
                <tr key={livro.id}>
                  <td>{livro.titulo}</td>
                  <td>{livro.preco}</td>
                  <td>{livro.autor.nome}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}